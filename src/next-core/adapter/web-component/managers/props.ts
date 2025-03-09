import { PropType } from '../../interface';
import type { PropsManager, PropsOptions, SerializationRule } from '../../props';
import { defaultSerializationRules } from '../../props';
import { camelToKebab, kebabToCamel } from '@/next-core/utils/naming';

/**
 * Web Components 的 Props 管理器实现
 */
export class WebPropsManager<T extends Record<string, PropType>> implements PropsManager<T> {
  private props: T;
  private options: PropsOptions<T>;
  private element: HTMLElement;
  private changeCallbacks: Set<(props: T) => void>;
  private propertyKeys: Set<string>;
  private initialized: boolean = false;

  constructor(element: HTMLElement, options: PropsOptions<T> = {}) {
    this.element = element;
    this.options = options;
    this.changeCallbacks = new Set();
    this.propertyKeys = new Set();

    // 1. 仅从默认值初始化
    this.props = (options.defaultProps ? { ...options.defaultProps } : {}) as T;

    // 2. 设置属性代理（这个需要尽早设置以捕获属性变化）
    this.setupPropertyProxy();

    // 3. 保留一个内部的 _props 访问器
    Object.defineProperty(element, '_props', {
      get: () => this.getProps(),
      set: (value: Partial<T>) => this.setProps(value),
      configurable: true,
      enumerable: false,
    });
  }

  /**
   * 在元素连接到 DOM 时初始化属性
   * 这个方法应该在 connectedCallback 中调用
   */
  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    const initialProps: Partial<T> = {};

    // 1. 从 attributes 获取初始值
    Array.from(this.element.attributes).forEach((attr) => {
      const propName = kebabToCamel(attr.name);
      initialProps[propName as keyof T] = this.deserializeFromAttribute(attr.name, attr.value);
    });

    // 2. 从 DOM 属性获取初始值
    Object.getOwnPropertyNames(this.element).forEach((key) => {
      if (
        // 跳过 HTMLElement 原型链上的属性
        !(key in HTMLElement.prototype) &&
        // 跳过内部属性
        !key.startsWith('_') &&
        // 跳过已经从 attribute 获取的属性
        !(key in initialProps) &&
        // 确保值不是 undefined
        (this.element as any)[key] !== undefined
      ) {
        initialProps[key as keyof T] = (this.element as any)[key];
        this.propertyKeys.add(key);
      }
    });

    // 3. 应用初始值
    if (Object.keys(initialProps).length > 0) {
      this.props = { ...this.props, ...initialProps } as T;
      // 触发一次变更通知
      this.changeCallbacks.forEach((callback) => callback(this.getProps()));
    }

    console.debug('[WebPropsManager] Initialized with props:', this.props);
  }

  /**
   * 获取当前的 props
   */
  getProps(): T {
    return { ...this.props };
  }

  /**
   * 更新 props
   */
  setProps(props: Partial<T>): void {
    const oldProps = this.props;
    this.props = { ...this.props, ...props } as T;

    // 处理需要同步到 attribute 的属性
    Object.entries(props).forEach(([key, value]) => {
      const rule = this.getSerializationRule(key as keyof T);
      if (rule.reflectToAttribute) {
        const attrValue = rule.serialize(value);
        if (attrValue === null) {
          this.element.removeAttribute(camelToKebab(key));
        } else {
          this.element.setAttribute(camelToKebab(key), attrValue);
        }
      }

      // 如果是通过属性设置的，也要更新 DOM 属性
      if (this.propertyKeys.has(key)) {
        (this.element as any)[key] = value;
      }
    });

    // 触发变更回调
    if (Object.keys(props).length > 0) {
      this.changeCallbacks.forEach((callback) => callback(this.getProps()));
    }
  }

  /**
   * 序列化 prop 到 attribute
   */
  serializeToAttribute(name: keyof T, value: T[keyof T]): string | null {
    const rule = this.getSerializationRule(name);
    return rule.serialize(value);
  }

  /**
   * 从 attribute 反序列化到 prop
   */
  deserializeFromAttribute(name: string, value: string): any {
    const propName = kebabToCamel(name) as keyof T;
    const rule = this.getSerializationRule(propName);
    return rule.deserialize(value);
  }

  /**
   * 监听 props 变化
   */
  onPropsChange(callback: (props: T) => void): () => void {
    this.changeCallbacks.add(callback);
    return () => this.changeCallbacks.delete(callback);
  }

  /**
   * 获取属性的序列化规则
   */
  private getSerializationRule(name: keyof T): Required<SerializationRule> {
    return {
      ...defaultSerializationRules,
      ...(this.options.serialization?.[name] || {}),
    };
  }

  /**
   * 设置属性代理
   */
  private setupPropertyProxy() {
    // 1. 从默认值设置代理
    Object.keys(this.options.defaultProps || {}).forEach((key) => {
      this.addPropertyProxy(key);
    });

    // 2. 从当前 props 中的所有属性设置代理
    Object.keys(this.props).forEach((key) => {
      this.addPropertyProxy(key);
    });
  }

  /**
   * 添加属性代理
   */
  private addPropertyProxy(key: string) {
    // 跳过 HTMLElement 原型链上已存在的属性
    if (key in HTMLElement.prototype) {
      console.warn(
        `[WebPropsManager] Property "${key}" conflicts with HTMLElement.prototype, skipping direct proxy`
      );
      return;
    }

    // 跳过已经设置过的属性
    if (Object.getOwnPropertyDescriptor(this.element, key)) {
      return;
    }

    Object.defineProperty(this.element, key, {
      get: () => this.props[key],
      set: (value) => {
        this.propertyKeys.add(key);
        this.setProps({ [key]: value } as Partial<T>);
      },
      configurable: true,
      enumerable: true,
    });
  }

  /**
   * 添加新的 prop
   */
  addProp(key: keyof T) {
    this.addPropertyProxy(key as string);
  }
}
