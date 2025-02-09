import {
  canUseHooksFlag,
  connectedCallbacks,
  createdCallbacks,
  disconnectedCallbacks,
} from './constants';
import { Component } from './interface';

export function useConnect<T>(self: Component<T>, callback: () => void) {
  if (self?.[canUseHooksFlag]) {
    self[connectedCallbacks].add(callback);
  } else {
    throw new Error('useConnect can only be used inside defineComponent');
  }
}

export const useDisconnect = <T>(self: Component<T>, callback: () => void) => {
  if (self?.[canUseHooksFlag]) {
    self[disconnectedCallbacks].add(callback);
  } else {
    throw new Error('useDisconnect can only be used inside defineComponent');
  }
};

export const useCreated = <T>(self: Component<T>, callback: () => void) => {
  if (self?.[canUseHooksFlag]) {
    self[createdCallbacks].add(callback);
  } else {
    throw new Error('useCreated can only be used inside defineComponent');
  }
};
