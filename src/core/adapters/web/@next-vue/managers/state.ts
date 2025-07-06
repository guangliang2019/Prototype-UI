import { AttributeManager, State, StateManager } from '@/core/interface';
import { isValidKebabCase, kebabToCamel } from '@/core/utils/naming';

class VueStateManager implements StateManager {
  private currentAttribute: string | undefined;
  private currentStateType: unknown;
  private stateIndex = 0;
  private states = new Map<number, State<any>>();
  private publicStates = new Map<string, any>();
  private host: HTMLElement | null = null;
  private attributeManager: AttributeManager | null = null;
  private pendingAttributes = new Map<
    string,
    {
      value: any;
      serialize: (value: any) => string | null;
    }
  >();
  // 存储待处理的属性监听器
  private pendingWatchers = new Map<
    string,
    {
      attribute: string;
      deserialize: (value: string) => any;
      state: State<any>;
    }
  >();
  // TODO: 这里可能需要优化
  init(host: HTMLElement, attributeManager: AttributeManager) {
    this.host = host;
    this.attributeManager = attributeManager;

    // 处理延迟的属性设置
    this.pendingAttributes.forEach(({ value, serialize }, attribute) => {
      const serializedValue = serialize(value);
      if (serializedValue === null) {
        this.host?.removeAttribute(attribute);
      } else {
        this.host?.setAttribute(attribute, serializedValue);
      }
    });
    this.pendingAttributes.clear();

    // 处理延迟的属性监听器
    this.pendingWatchers.forEach(({ attribute, deserialize, state }) => {
      this.attributeManager?.watch(attribute, (_, newValue) => {
        const value = deserialize(newValue);
        this.publicStates.set(attribute, value);
        state.set(value);
      });
    });
    this.pendingWatchers.clear();
  }

  useState<T>(
    initial: T,
    attribute?: string,
    options?: { serialize?: (value: T) => string; deserialize?: (value: string) => T }
  ): State<T> {
    this.currentAttribute = attribute;
    this.currentStateType = initial;
    const state = this._useState(initial, attribute, options);
    this.currentAttribute = undefined;
    this.currentStateType = undefined;
    return state;
  }

  private _useState<T>(
    initial: T,
    attribute?: string,
    options?: { serialize?: (value: T) => string; deserialize?: (value: string) => T }
  ): State<T> {
    const index = this.stateIndex++;
    if (attribute && !isValidKebabCase(attribute)) {
      console.warn(`[Prototype-UI] attribute 名称必须是 kebab-case 格式，当前值为 "${attribute}"`);
      attribute = undefined;
    }
    const shouldSync = attribute && this.canSyncToAttribute(initial);
    if (attribute && !shouldSync) {
      console.warn(
        `[Prototype-UI] 只有 boolean、string、number 类型的状态可以被暴露为 attribute，当前类型为 ${typeof initial}`
      );
    }

    if (!this.states.has(index)) {
      let currentValue = initial;
      const state: State<T> = {
        get value() {
          return currentValue;
        },
        set: (value: T) => {
          currentValue = value;
          if (shouldSync && attribute) {
            const serialize = options?.serialize ?? this.defaultSerialize;
            if (value !== this.publicStates.get(attribute)) {
              this.publicStates.set(attribute, value);

              // 如果 host 已经初始化，直接设置属性
              if (this.host?.isConnected) {
                const serializedValue = serialize(value as T & string);
                if (serializedValue === null) {
                  this.host?.removeAttribute(attribute);
                } else {
                  this.host?.setAttribute(attribute, serializedValue);
                }
              } else {
                // 否则加入待处理队列
                this.pendingAttributes.set(attribute, {
                  value,
                  serialize,
                });
              }
            }
          }
        },
      };
      this.states.set(index, state);

      if (shouldSync && attribute) {
        const serialize = options?.serialize ?? this.defaultSerialize;
        const deserialize = options?.deserialize ?? this.defaultDeserialize;
        this.publicStates.set(attribute, initial);

        // 将初始值加入待处理队列
        this.pendingAttributes.set(attribute, {
          value: initial,
          serialize,
        });

        // 如果 attributeManager 已经初始化，直接设置监听器
        if (this.attributeManager) {
          this.attributeManager.watch(attribute, (_, newValue) => {
            const value = deserialize(newValue);
            this.publicStates.set(attribute, value);
            state.set(value);
          });
        } else {
          // 否则加入待处理队列
          this.pendingWatchers.set(attribute, {
            attribute,
            deserialize,
            state,
          });
        }
      }
      return state;
    }

    return this.states.get(index)!;
  }

  flushAttributes(): void {
    this.pendingAttributes.forEach(({ value, serialize }, attribute) => {
      this.currentAttribute = attribute;
      const serializedValue = serialize(value);
      this.currentAttribute = undefined;
      if (serializedValue === null) {
        this.host?.removeAttribute(attribute);
      } else {
        this.host?.setAttribute(attribute, serializedValue);
      }
  
  
    });
    this.pendingAttributes.clear();
  }

  getStates(): Readonly<Record<string, any>> {
    return Object.fromEntries(
      Array.from(this.publicStates.entries()).map(([key, value]) => [kebabToCamel(key), value])
    ) as Readonly<Record<string, any>>;
  }

  clear(): void {
    this.states.clear();
    this.publicStates.clear();
    this.pendingAttributes.clear();
    this.pendingWatchers.clear();
    this.stateIndex = 0;
  }

  private canSyncToAttribute(value: unknown): boolean {
    const type = typeof value;
    return type === 'boolean' || type === 'string' || type === 'number';
  }

  private defaultSerialize = <T>(value: T): string | null => {
    if (typeof value === 'boolean') {
      // 对于 aria 属性，使用 "true"/"false" 字符串
      if (this.currentAttribute && this.isAriaAttribute(this.currentAttribute)) {
        return value ? 'true' : 'false';
      }
      // 对于其他属性，true 时返回空字符串，false 时通过返回 null 来移除属性
      return value ? '' : null;
    }
    return String(value);
  };

  private defaultDeserialize = <T>(value: string): T => {
    if (this.currentAttribute && this.isAriaAttribute(this.currentAttribute)) {
      if (value === 'true') return true as T;
      if (value === 'false') return false as T;
    } else {
      if (typeof this.currentStateType === 'boolean') {
        return (value !== null) as T;
      }
    }

    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10) as T;
    }
    if (/^-?\d*\.\d+$/.test(value)) {
      return parseFloat(value) as T;
    }

    return value as T;
  };

  private isAriaAttribute(name: string): boolean {
    return name.startsWith('aria-');
  }
}

export default VueStateManager;
