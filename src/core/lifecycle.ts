import {
  attributeListeners,
  canUseHooksFlag,
  connectedCallbacks,
  createdCallbacks,
  disconnectedCallbacks,
} from './constants';
import { Component, DataState, DataStateType, Prototype } from './interface';

export function useConnect<T extends Object = {}>(p: Prototype<T>, callback: () => void) {
  if (p?.[canUseHooksFlag]) {
    p[connectedCallbacks].add(callback);
  } else {
    throw new Error('useConnect can only be used inside defineComponent');
  }
}

export const useDisconnect = <T extends Object = {}>(p: Prototype<T>, callback: () => void) => {
  if (p?.[canUseHooksFlag]) {
    p[disconnectedCallbacks].add(callback);
  } else {
    throw new Error('useDisconnect can only be used inside defineComponent');
  }
};

export const useCreated = <T extends Object = {}>(p: Prototype<T>, callback: () => void) => {
  if (p?.[canUseHooksFlag]) {
    p[createdCallbacks].add(callback);
  } else {
    throw new Error('useCreated can only be used inside defineComponent');
  }
};

export const watchAttribute = <T extends Record<string, any>, K extends string>(
  p: Prototype<T>,
  attribute: K,
  onChange: (oldValue: string, newValue: string) => void
) => {
  if (p?.[canUseHooksFlag]) {
    if (!p[attributeListeners].has(attribute)) {
      p[attributeListeners].set(attribute, new Set());
    }
    p[attributeListeners].get(attribute)!.add(onChange);
  } else {
    throw new Error('useCreated can only be used inside defineComponent');
  }
};

export const defineProps = <T extends Record<string, any>, K extends keyof T = keyof T>(
  p: Prototype<T>,
  defaultProps: T,
  onChange: (key: K, value: T[K]) => void = () => {}
) => {
  if (!p?.[canUseHooksFlag]) throw new Error('defineProps can only be used inside defineComponent');
  const keys = Object.keys(defaultProps) as K[];
  const _props = defaultProps;

  keys.forEach((key) => {
    useCreated(p, () => {
      const component = p.componentRef;
      // TODO: 如果该 props 已经定义过，需要更新定义，当前的代码会导致重定义失败
      Object.defineProperty(component, key as K, {
        get: () => _props[key],
        set: (value) => {
          _props[key] = value;
          // 同步到 attribute
          if (typeof key === 'string') handleAttributeState(p, camelCaseToKebabCase(key), value);
          onChange(key, value);
        },
      });
    });

    // 如果 key 不是 string，不进行 watchAttribute
    if (typeof key !== 'string') return;

    // 根据 defaultValue 的类型，决定如何初始化，以及如何监听 attribute 的变化
    switch (typeof defaultProps[key]) {
      case 'boolean':
        watchAttribute(p, camelCaseToKebabCase(key), (oldValue, newValue) => {
          if (oldValue === newValue) return;
          const component = p.componentRef;
          component[key] = (newValue !== null) as (Component<T> & T)[K];
        });
        break;

      case 'string':
        watchAttribute(p, camelCaseToKebabCase(key), (oldValue, newValue) => {
          if (oldValue === newValue) return;
          const component = p.componentRef;
          component[key] = newValue as (Component<T> & T)[K];
        });
        break;

      case 'number':
        watchAttribute(p, camelCaseToKebabCase(key), (oldValue, newValue) => {
          if (oldValue === newValue) return;
          const component = p.componentRef;
          component[key] = Number(newValue) as (Component<T> & T)[K];
        });
        break;

      default:
        // 除了 boolean, string, number 之外, 其他类型的属性, 不做处理
        break;
    }
  });
};

const handleAttributeState = <T extends DataStateType>(
  p: Prototype,
  stateName: string,
  value: T
) => {
  if (!p?.[canUseHooksFlag])
    throw new Error('useDataState can only be used inside defineComponent');
  if (typeof value === 'string') {
    if (!value)
      console.warn(
        `state 数据类型为 string 时, ${stateName} 的值是空字符串, 这不符合 state 的取值规范, 最终表现上会与 boolean 类型的 state 为 true 时混淆`
      );
    p.componentRef.setAttribute(stateName, value);
  }
  if (typeof value === 'boolean') {
    if (value) p.componentRef.setAttribute(stateName, '');
    else p.componentRef.removeAttribute(stateName);
  }
  if (typeof value === 'number') {
    p.componentRef.setAttribute(stateName, value.toString());
  }
};

export const useAttributeState = <T extends string | boolean | number>(
  p: Prototype,
  stateName: string,
  defaultValue: T
): DataState<T> => {
  if (!p?.[canUseHooksFlag])
    throw new Error('useDataState can only be used inside defineComponent');

  const state = { value: defaultValue };

  useConnect(p, () => {
    handleAttributeState(p, `data-${stateName}`, defaultValue);
  });

  return new Proxy(state, {
    set(target, _, value) {
      handleAttributeState(p, `data-${stateName}`, value);
      target.value = value;
      return Reflect.set(target, _, value);
    },
  });
};

const camelCaseToKebabCase = (str: string) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};
