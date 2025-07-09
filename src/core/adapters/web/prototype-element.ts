// prototype-element.ts

/**
 * PrototypeElement 是 Proto UI 中对 Element 概念的抽象，
 * 它并不等同于 HTMLElement，而是对其子集语义的表达。
 * 用于收集在组件初始化阶段设置的属性和样式，
 * 并可在真实 DOM 节点或构建 h() 参数时统一应用。
 */

export type PendingOperation =
  | { type: 'set'; key: string; value: any }
  | { type: 'set-style'; key: string; value: string }
  | { type: 'set-attr'; key: string; value: string }
  | { type: 'remove-attr'; key: string };

export interface PrototypeElement {
  readonly type: 'prototype-element';
  getState(): PrototypeElementSnapshot;
  applyTo(target: HTMLElement): void;
  toHProps(): Record<string, any>;
  readonly element: HTMLElement;
}

export interface PrototypeElementSnapshot {
  attributes: Record<string, string>;
  style: Record<string, string>;
  className?: string;
  id?: string;
}

export function createPrototypeElement(): PrototypeElement {
  const state: Record<string, any> = {};
  const styleState: Record<string, string> = {};
  const attrState: Record<string, string> = {};
  const operations: PendingOperation[] = [];

  const element = new Proxy({} as HTMLElement, {
    get(_, key: string) {
      if (key === 'style') {
        return new Proxy(
          {},
          {
            get(_, styleKey: string) {
              return styleState[styleKey] ?? '';
            },
            set(_, styleKey: string, value: string) {
              styleState[styleKey] = value;
              operations.push({ type: 'set-style', key: styleKey, value });
              return true;
            },
          }
        );
      }
      if (key === 'setAttribute') {
        return (k: string, v: string) => {
          attrState[k] = v;
          operations.push({ type: 'set-attr', key: k, value: v });
        };
      }
      if (key === 'removeAttribute') {
        return (k: string) => {
          delete attrState[k];
          operations.push({ type: 'remove-attr', key: k });
        };
      }
      if (key in state) return state[key];

      throw new Error(
        `[PrototypeElement] property "\${String(key)}" is not supported before mount.`
      );
    },
    set(_, key: string, value: any) {
      if (typeof key === 'string') {
        state[key] = value;
        operations.push({ type: 'set', key, value });
        return true;
      }
      throw new Error(
        `[PrototypeElement] property "\${String(key)}" is not supported before mount.`
      );
    },
  });

  const applyTo = (target: HTMLElement) => {
    for (const op of operations) {
      switch (op.type) {
        case 'set':
          (target as any)[op.key] = op.value;
          break;
        case 'set-style':
          (target.style as any)[op.key] = op.value;
          break;
        case 'set-attr':
          target.setAttribute(op.key, op.value);
          break;
        case 'remove-attr':
          target.removeAttribute(op.key);
          break;
      }
    }
  };

  const getState = (): PrototypeElementSnapshot => {
    const attributes: Record<string, string> = { ...attrState };
    for (const key in state) {
      const val = state[key];
      if (typeof val === 'string') {
        attributes[key] = val;
      }
    }
    return {
      attributes,
      style: { ...styleState },
      className: state.className,
      id: state.id,
    };
  };

  const toHProps = (): Record<string, any> => {
    const style = { ...styleState };
    const attrs = { ...attrState };
    for (const key in state) {
      if (!(key in attrs)) {
        attrs[key] = state[key];
      }
    }
    const props: Record<string, any> = {
      ...attrs,
      style,
    };
    if (state.className) props.class = state.className;
    if (state.id) props.id = state.id;
    return props;
  };

  return {
    type: 'prototype-element',
    element,
    applyTo,
    getState,
    toHProps,
  };
}
