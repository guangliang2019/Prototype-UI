import {
  attributeListeners,
  canUseHooksFlag,
  connectedCallbacks,
  contextListeners,
  createdCallbacks,
  disconnectedCallbacks,
  handleRequestContext,
  initProps,
  listenKeys,
  listenValues,
  provideKeys,
  provideValues,
  requestContext,
  setContext,
  updateContext,
} from './constants';

export interface Prototype<T extends Record<string, any> = Record<string, any>>
  extends Record<string | symbol, any> {
  componentRef: Component<T> & T;

  /*********** Others ************/
  /**
   * A flag to indicate whether the component can use hooks. Just a simple judgment.
   */
  [canUseHooksFlag]: boolean;
  /**
   * The initial props of the component.
   */
  [initProps]: T;

  /*********** Lifecycle ************/
  /**
   * A Set of callbacks that will be called when the component is created.
   */
  [createdCallbacks]: Set<() => void>;
  /**
   * A Set of callbacks that will be called when the component is connected to the DOM.
   */
  [connectedCallbacks]: Set<() => void>;
  /**
   * A Set of callbacks that will be called when the component is disconnected from the DOM.
   */
  [disconnectedCallbacks]: Set<() => void>;
  /**
   * A Map, key is attribute name, value is a Set of callbacks that will be called when the attribute is changed.
   */
  [attributeListeners]: Map<string, Set<(oldValue: string, newValue: string) => void>>;

  /**
   * Custom lifecycle hook. This is called when the component is connected. Or when the component is updated.
   */
  render(): void;

  /**
   * Custom lifecycle hook. This is called when the component is updated.
   */
  update(): void;

  /*********** Context ************/
  /**
   * If component has at least one contextListener, this will be called at the component connected.
   */
  [requestContext]: (key: string | symbol) => void;
  /**
   * If component has provide at least one context, this will be called at the component connected.
   */
  [handleRequestContext]: (event: CustomEvent<RequestContextEventDetail>) => void;
  /**
   * If component has at least one contextListener, ContextManger will call this to set context of the component.
   */
  [setContext]: <C extends Record<string, any>>(
    key: string | symbol,
    context: Partial<C>,
    changedKeys: string[]
  ) => void;
  /**
   * If component has at least provide one context, this function will enable.
   */
  [updateContext]: <C extends Record<string, any>>(
    key: string | symbol,
    context: Partial<C>,
    notify?: boolean
  ) => void;
  /**
   * A Map of context listeners. Key is context key, value is context listener
   */
  [contextListeners]: Map<string | symbol, Set<(context: any, changedKeys: string[]) => void>>;
  /**
   * A Set of context keys that the component is listening to.
   */
  [listenKeys]: Set<string | symbol>;
  /**
   * A Set of context keys that the component is providing.
   */
  [provideKeys]: Set<string | symbol>;
  /**
   * A Map of context values that the component is listening. Key is context key, value is context value
   */
  [listenValues]: Map<string | symbol, any>;
  /**
   * A Map of context values that the component is providing. Key is context key, value is context value
   */
  [provideValues]: Map<string | symbol, any>;
}

export interface Component<T extends Record<string, any> = Record<string, any>>
  extends HTMLElement {
  prototypeRef: Prototype<T>;
}

export type RequestContextEventDetail = {
  key: string | symbol;
  consumer: Prototype;
};

export type Hook<Props extends Record<string | symbol, any> = Record<string | symbol, any>> = (
  prototype: Prototype<Props>,
  ...args: any
) => void;

export type FC<Props extends Record<string | symbol, any> = Record<string | symbol, any>> = (
  prototype: Prototype<Props>,
  ...args: any
) => HTMLElement;

export type Constructor<T> = new (args: any) => T;