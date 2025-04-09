import { isValidKebabCase, kebabToCamel } from '@/core/utils/naming';
import { AttributeManager, State, StateManager } from '@/core/interface';

/**
 * Web Components 状态管理器
 */
export class WebStateManager implements StateManager {
  private states = new Map<number, State<any>>();
  private publicStates = new Map<string, any>();
  private stateIndex = 0;
  private pendingAttributes = new Map<
    string,
    {
      value: any;
      serialize: (value: any) => string | null;
    }
  >();

  constructor(
    private host: HTMLElement,
    private attributeManager: AttributeManager
  ) {}

  useState<T>(
    initial: T,
    attribute?: string,
    options?: {
      serialize?: (value: T) => string;
      deserialize?: (value: string) => T;
    }
  ): State<T> {
    // 设置当前上下文
    this.currentAttribute = attribute;
    this.currentStateType = initial;

    const state = this._useState(initial, attribute, options);

    // 清理上下文
    this.currentAttribute = undefined;
    this.currentStateType = undefined;

    return state;
  }

  private _useState<T>(
    initial: T,
    attribute?: string,
    options?: {
      serialize?: (value: T) => string;
      deserialize?: (value: string) => T;
    }
  ): State<T> {
    const index = this.stateIndex++;

    // 验证 attribute 名称格式
    if (attribute && !isValidKebabCase(attribute)) {
      console.warn(`[Prototype-UI] attribute 名称必须是 kebab-case 格式，当前值为 "${attribute}"`);
      attribute = undefined;
    }

    // 检查是否需要同步到 attribute
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
          // 更新内部状态
          currentValue = value;

          // 如果需要同步到 attribute
          if (shouldSync && attribute) {
            const serialize = options?.serialize ?? this.defaultSerialize;
            if (value !== this.publicStates.get(attribute)) {
              this.publicStates.set(attribute, value);
              // 如果元素已经连接到 DOM
              if (this.host.isConnected) {
                const serializedValue = serialize(value);
                if (serializedValue === null) {
                  this.host.removeAttribute(attribute);
                } else {
                  this.host.setAttribute(attribute, serializedValue);
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

      // 如果需要同步到 attribute，设置初始值并监听变化
      if (shouldSync && attribute) {
        const serialize = options?.serialize ?? this.defaultSerialize;
        const deserialize = options?.deserialize ?? this.defaultDeserialize;

        this.publicStates.set(attribute, initial);
        // 将初始值加入待处理队列
        this.pendingAttributes.set(attribute, {
          value: initial,
          serialize,
        });

        this.attributeManager.watch(attribute, (_, newValue) => {
          const value = deserialize(newValue);
          this.publicStates.set(attribute, value);
          state.set(value);
        });
      }

      return state;
    }

    return this.states.get(index)!;
  }

  /**
   * 同步所有待处理的属性到 DOM
   * 在元素连接到 DOM 后调用
   */
  flushAttributes(): void {
    this.pendingAttributes.forEach(({ value, serialize }, attribute) => {
      // 设置当前上下文
      this.currentAttribute = attribute;
      const serializedValue = serialize(value);
      // 清理上下文
      this.currentAttribute = undefined;

      if (serializedValue === null) {
        this.host.removeAttribute(attribute);
      } else {
        this.host.setAttribute(attribute, serializedValue);
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
    this.stateIndex = 0;
  }

  private canSyncToAttribute(value: unknown): boolean {
    const type = typeof value;
    return type === 'boolean' || type === 'string' || type === 'number';
  }

  private isAriaAttribute(name: string): boolean {
    return name.startsWith('aria-');
  }

  private defaultSerialize = (value: unknown): string | null => {
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
    // 对于 aria 属性，使用字符串值判断
    if (this.currentAttribute && this.isAriaAttribute(this.currentAttribute)) {
      if (value === 'true') return true as T;
      if (value === 'false') return false as T;
    } else {
      // 对于其他属性，存在即为 true
      if (typeof this.currentStateType === 'boolean') {
        return (value !== null) as T;
      }
    }

    // 尝试解析数字
    if (/^-?\d+$/.test(value)) return parseInt(value, 10) as T;
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value) as T;

    // 其他情况返回原始字符串
    return value as T;
  };

  // 添加辅助属性来传递上下文信息
  private currentAttribute: string | undefined;
  private currentStateType: unknown;
}
