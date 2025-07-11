import { PropsManager, PropsOptions, SerializationRule } from '@/core/interface';
import { camelToKebab, kebabToCamel } from '@/core/utils/naming';

class VuePropsManager<T extends object> implements PropsManager<T> {
  private _props: T = {} as T;
  private _options: PropsOptions<T> | null = null;
  private _element: HTMLElement | null = null;
  private _initFlag = false;
  private _changeCallbacks: Set<(props: T) => void> = new Set();
  private _propertyKeys: Set<string> = new Set();
  private _checkInit(funcName: string) {
    if (this._initFlag) return;
    throw new Error(`[Vue Adapter] 不要在 setup 中使用 p.props.${funcName}`);
  }

  private _defineProps: T = {} as T;
  // 新增：存储待创建的属性代理
  private _pendingProxies: Set<T> = new Set();

  // 没有初始化，可能某个功能用不了， 换名
  initRef(element: HTMLElement, options: PropsOptions<T> = {}) {
    this._initFlag = true;
    this._element = element;
    this._options = options;
    this._props = {} as T;
    this._changeCallbacks = new Set();

    this.setupPropertyProxy();

    Object.defineProperty(element, '_props', {
      get: () => this.getProps(),
      set: (value: Partial<T>) => this.setProps(value),
      configurable: true,
      enumerable: false,
    });

    const initProps: Partial<T> = {};
    Array.from(this._element?.attributes || []).forEach((attr) => {
      const propName = kebabToCamel(attr.name) as keyof T;
      initProps[propName as keyof T] = this.deserializeFromAttribute(attr.name, attr.value);
    });

    Object.getOwnPropertyNames(element).forEach((key) => {
      if (
        // 跳过 HTMLElement 原型链上的属性
        !(key in HTMLElement.prototype) &&
        // 跳过内部属性
        !key.startsWith('_') &&
        // 跳过已经从 attribute 获取的属性
        !(key in initProps) &&
        // 确保值不是 undefined
        (element as any)[key] !== undefined
      ) {
        initProps[key as keyof T] = (element as any)[key];
        this._propertyKeys.add(key);
      }
    });

    if (Object.keys(initProps).length > 0) {
      this._props = { ...this._props, ...initProps } as T;
      this._changeCallbacks.forEach((callback) => callback(this.getProps()));
    }
  }

  getVuePropsDefinition() {
    const vueProps = Object.entries(this._defineProps).reduce(
      (acc, [key, value]) => {
        // 获取值的类型
        const type = Object.prototype.toString.call(value).slice(8, -1);

        acc[key] = {
          // 根据值类型确定Vue props的type
          type:
            type === 'Date'
              ? Date
              : type === 'Array'
                ? Array
                : type === 'String'
                  ? String
                  : type === 'Number'
                    ? Number
                    : type === 'Boolean'
                      ? Boolean
                      : type === 'Function'
                        ? Function
                        : Object,
          // 设置默认值
          default: type === 'Object' || type === 'Array' ? () => value : value,
        };
        return acc;
      },
      {} as Record<string, any>
    );
    return vueProps;
  }

  getProps(): T {
    // TODO：这里可能需要用户在写setup的时候可能会直接写p.props.get()，而不是放到其他方法中。

    const actualProps = { ...this._props };
    // 从 attributes 获取实际值
    Array.from(this._element?.attributes || []).forEach((attr) => {
      const propName = kebabToCamel(attr.name) as keyof T;
      actualProps[propName] = this.deserializeFromAttribute(attr.name, attr.value);
    });

    // 从 DOM 属性获取实际值
    Object.getOwnPropertyNames(this._element || {}).forEach((key) => {
      if (
        !(key in HTMLElement.prototype) &&
        !key.startsWith('_') &&
        (this._element as any)[key] !== undefined
      ) {
        actualProps[key as keyof T] = (this._element as any)[key];
      }
    });

    return actualProps as T;
  }

  setProps(props: Partial<T>): void {
    this._props = { ...this._props, ...props } as T;
    // 处理需要同步到 attribute 的属性
    Object.entries(props).forEach(([key, value]) => {
      const rule = this.getSerializationRule(key as keyof T);
      if (rule.reflectToAttribute) {
        const attrValue = rule.serialize(value);
        if (attrValue === null) {
          this._element?.removeAttribute(camelToKebab(key));
        } else {
          this._element?.setAttribute(camelToKebab(key), attrValue);
        }
      }
      // 如果是通过属性设置的，也要更新 DOM 属性
      if (this._propertyKeys.has(key)) {
        (this._element as any)[key] = value;
      }
    });

    // todo 这里的对应的webComponent里面的props 有一个listener 功能有的奇怪

    // 触发变更回调
    if (Object.keys(props).length > 0) {
      this._changeCallbacks.forEach((callback) => callback(this.getProps()));
    }
  }

  serializeToAttribute(name: keyof T, value: T[keyof T]): string | null {
    const rule = this.getSerializationRule(name);
    return rule.serialize(value);
  }

  deserializeFromAttribute(name: string, value: string): any {
    const propName = kebabToCamel(name) as keyof T;
    const rule = this.getSerializationRule(propName);
    return rule.deserialize(value);
  }

  onPropsChange(callback: (props: T) => void): () => void {
    this._changeCallbacks.add(callback);
    return () => this._changeCallbacks.delete(callback);
  }

  mount() {
    this._pendingProxies.forEach((key) => {
      this.defineProps(key as T);
    });
    this._pendingProxies.clear();
  }

  defineProps(defaultProps: T): void {
    this._defineProps = { ...defaultProps } as T;

    if (!this._initFlag) {
      this._pendingProxies.add(defaultProps as T);
      return;
    }

    this._props = { ...this._props, ...defaultProps } as T;

    // 延迟创建属性代理
    Object.keys(defaultProps).forEach((key) => {
      // 如果 DOM 元素已经可用，直接创建代理
      this.addPropertyProxy(key);
    });
  }

  private getSerializationRule(name: keyof T): Required<SerializationRule> {
    return {
      ...defaultSerializationRules,
      ...(this._options?.serialization?.[name] || {}),
    };
  }

  /**
   * 添加属性代理
   */
  private addPropertyProxy(key: string) {
    // 跳过 HTMLElement 原型链上已存在的属性
    if (key in HTMLElement.prototype) {
      console.warn(
        `[VuePropsManager] Property "${key}" conflicts with HTMLElement.prototype, skipping direct proxy`
      );
      return;
    }

    // 跳过已经设置过的属性
    if (Object.getOwnPropertyDescriptor(this._element, key)) {
      return;
    }

    Object.defineProperty(this._element, key, {
      get: () => this._props[key as keyof T],
      set: (value) => {
        this._propertyKeys.add(key);
        this.setProps({ [key]: value } as Partial<T>);
      },
      configurable: true,
      enumerable: true,
    });
  }

  private setupPropertyProxy() {
    // 1. 从默认值设置代理
    Object.keys(this._options?.defaultProps || {}).forEach((key) => {
      this.addPropertyProxy(key);
    });

    // 2. 从当前 props 中的所有属性设置代理
    Object.keys(this._props).forEach((key) => {
      this.addPropertyProxy(key);
    });
  }
}

/**
 * 默认的序列化规则
 */
export const defaultSerializationRules: Required<SerializationRule> = {
  reflectToAttribute: false,
  serialize: (value: any) => {
    if (typeof value === 'boolean') {
      // 布尔值为 true 时设置空字符串，为 false 时移除属性
      return value ? '' : null;
    }
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return null;
  },
  deserialize: (value: string) => {
    // 1. 对于布尔类型，属性存在就是 true（无论值是什么）
    if (value === null) return false; // 属性不存在
    if (typeof value === 'string') {
      // 2. 尝试解析数字
      if (/^-?\d+$/.test(value)) return parseInt(value, 10);
      if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value);
    }
    // 3. 其他情况返回原始字符串
    return value;
  },
};

export default VuePropsManager;
