import {
  attributeListeners,
  canUseHooksFlag,
  connectedCallbacks,
  createdCallbacks,
  disconnectedCallbacks,
} from './constants';
import { DataState, DataStateType, Prototype } from './interface';

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

export const watchAttribute = <T extends Object = {}>(
  p: Prototype<T>,
  attribute: string,
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

export const defineProps = <T extends Object, K extends keyof T = keyof T>(
  p: Prototype<T>,
  defaultProps: T,
  onChange: (key: K, oldValue: T[K], newValue: T[K]) => void = () => {}
) => {
  if (!p?.[canUseHooksFlag]) throw new Error('defineProps can only be used inside defineComponent');
  const keys = Object.keys(defaultProps) as K[];
  const component = p.componentRef;
  keys.forEach((key) => {
    Object.defineProperty(component, key, {
      get: () => component[key],
      set: (value) => {
        const oldValue = component[key];
        component[key] = value;
        onChange(key, oldValue, value);
      },
    });
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
        `state 数据类型为 string 时, state-${stateName} 的值是空字符串, 这不符合 state 的取值规范, 最终表现上会与 boolean 类型的 state 为 true 时混淆`
      );
    p.componentRef.setAttribute(`state-${stateName}`, value);
  }
  if (typeof value === 'boolean') {
    if (value) p.componentRef.setAttribute(`state-${stateName}`, '');
    else p.componentRef.removeAttribute(`state-${stateName}`);
  }
  if (typeof value === 'number') {
    p.componentRef.setAttribute(`state-${stateName}`, value.toString());
  }
};

export const useAttributeState = <T extends DataStateType>(
  p: Prototype,
  stateName: string,
  defaultValue: T
): DataState<T> => {
  if (!p?.[canUseHooksFlag])
    throw new Error('useDataState can only be used inside defineComponent');

  const state = { value: defaultValue };
  return new Proxy(state, {
    set(target, _, value) {
      handleAttributeState(p, stateName, value);
      target.value = value;
      return true;
    },
  });
};
