import { StateManager, State, AttributeManager } from '@/core/interface';
import { isValidKebabCase, kebabToCamel } from '@/core/utils/naming';


export const createStateManager = (host: HTMLElement, attributeManager: AttributeManager): StateManager => {
  const states = new Map<number, State<any>>();
  const publicStates = new Map<string, any>();
  const pendingAttributes = new Map<
  string, { 
    value: any; 
    serialize: (value: any) => string | null;
  }>();
  let stateIndex = 0;

  let _currentAttribute: string | undefined;
  let _currentStateType: unknown;

  const _isAriaAttribute = (name: string): boolean => {
    return name.startsWith('aria-');
  }

  const _canSyncToAttribute = (value: unknown): boolean => {
    const type = typeof value;
    return type === 'boolean' || type === 'string' || type === 'number';
  }
  const _defaultDeserialize = <T>(value: string): T => {
    // 对于 aria 属性，使用字符串值判断
    if (_currentAttribute && _isAriaAttribute(_currentAttribute)) {
      if (value === 'true') return true as T;
      if (value === 'false') return false as T;
    } else {
      // 对于其他属性，存在即为 true
      if (typeof _currentStateType === 'boolean') {
        return (value !== null) as T;
      }
    }

    // 尝试解析数字
    if (/^-?\d+$/.test(value)) return parseInt(value, 10) as T;
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value) as T;

    // 其他情况返回原始字符串
    return value as T;
  };
  const _defaultSerialize = (value: unknown): string | null => {
    if (typeof value === 'boolean') {
      // 对于 aria 属性，使用 "true"/"false" 字符串
      if (_currentAttribute && _isAriaAttribute(_currentAttribute)) {
        return value ? 'true' : 'false';
      }
      // 对于其他属性，true 时返回空字符串，false 时通过返回 null 来移除属性
      return value ? '' : null;
    }
    return String(value);
  };

  // 这个不需要改变，用户去进行状态定义对于vue来说和webComponent一样
  const _useState = <T>(initial: T, attribute?: string, options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }): State<T> => {
    const index = stateIndex++;
    
    if (attribute && !isValidKebabCase(attribute)) {
      console.warn(`[Prototype-UI] attribute 名称必须是 kebab-case 格式，当前值为 "${attribute}"`);
      attribute = undefined;
    }

    const shouldSync = attribute && _canSyncToAttribute(initial);
    if(shouldSync && attribute){
      console.warn(
        `[Prototype-UI] 只有 boolean、string、number 类型的状态可以被暴露为 attribute，当前类型为 ${typeof initial}`
      );
    }

    if (!states.has(index)) {
      // 使用 Vue 的 ref 创建响应式状态
      let currentValue = initial;

      const state: State<T> = {
        get value() {
          return currentValue;
        },
        set: (value: T) => {
          currentValue = value;
          
          if (shouldSync && attribute) {
            const serialize = options?.serialize ?? _defaultSerialize;
            if (value !== publicStates.get(attribute)) {
              publicStates.set(attribute, value);
              // 如果元素已经连接到 DOM
              if (host.isConnected) {
                const serializedValue = serialize(value);
                if (serializedValue === null) {
                  host.removeAttribute(attribute);
                } else {
                  host.setAttribute(attribute, serializedValue);
                }
              } else {
                // 否则加入待处理队列
                pendingAttributes.set(attribute, {
                  value,
                  serialize,
                });
              }
            }
          }
        },
      };

      states.set(index, state);
      // 如果需要同步到属性，设置初始值
      if (shouldSync && attribute) {
        const serialize = options?.serialize ?? _defaultSerialize;
        const deserialize = options?.deserialize ?? _defaultDeserialize;


        publicStates.set(attribute, initial);
        pendingAttributes.set(attribute, {
          value: initial,
          serialize,
        });

        attributeManager.watch(attribute, (_, newValue) => {
          const value = deserialize(newValue);
          publicStates.set(attribute, value);
          state.set(value);
        });
      }


      return state;
    }

    return states.get(index)!;
  };

  return {
    useState: <T>(initial: T, attribute?: string, options?: {
      serialize?: (value: T) => string;
      deserialize?: (value: string) => T;
    }): State<T> => {
      _currentAttribute = attribute;
      _currentStateType = initial;
      const state = _useState(initial, attribute, options);
      _currentAttribute = undefined;
      _currentStateType = undefined;
      return state;
    },
    flushAttributes(): void {
      pendingAttributes.forEach(({ value, serialize }, attribute) => {
        // 设置当前上下文
        _currentAttribute = attribute;
        const serializedValue = serialize(value);
        // 清理上下文
        _currentAttribute = undefined;
  
        if (serializedValue === null) {
          host.removeAttribute(attribute);
        } else {
          host.setAttribute(attribute, serializedValue);
        }
      });
      pendingAttributes.clear();
    },

    getStates: (): Readonly<Record<string, any>> => {
      return Object.fromEntries(
        Array.from(publicStates.entries()).map(([key, value]) => [kebabToCamel(key), value])
      ) as Readonly<Record<string, any>>;
    },

    clear: () => {
      states.clear();
      publicStates.clear();
      pendingAttributes.clear();
      stateIndex = 0;
    }
  };
};
