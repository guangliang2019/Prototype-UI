import {
  attributeListeners,
  canUseHooksFlag,
  connectedCallbacks,
  createdCallbacks,
  disconnectedCallbacks,
} from './constants';
import { Prototype } from './interface';

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
