import { canUseHooksFlag, connectedCallbacks, contextListeners, createdCallbacks, disconnectedCallbacks, handleRequestContext, initProps, listenKeys, listenValues, provideKeys, provideValues, requestContext, setContext, updateContext } from './constants';
import { ContextManager } from './context';
import { Component, RequestContextEventDetail } from './interface';

/**
 * Define a web component with hooks.
 *
 * @param setup
 * A function to declare your component, you can use **hooks** in setup.
 *
 * Should return a `HTMLElement` or `void`.
 * @returns An anonymous class extends `HTMLElement`, can be used as a **web component** or other things.
 */
export const defineComponent = <T>(
  setup: (self: Component<T> & T) => HTMLElement | void
): Constructor<Component<T>> => {
  return class extends HTMLElement {
    [canUseHooksFlag] = true;

    [initProps]: T = null as any;
    // lifecycle
    [createdCallbacks]: Set<() => void> = new Set();
    [connectedCallbacks]: Set<() => void> = new Set();
    [disconnectedCallbacks]: Set<() => void> = new Set();
    // context
    [contextListeners]: Component<T>[typeof contextListeners] = new Map();
    [provideValues]: Component<T>[typeof provideValues] = new Map();
    [provideKeys]: Component<T>[typeof provideKeys] = new Set();
    [listenKeys]: Component<T>[typeof listenKeys] = new Set();
    [listenValues]: Component<T>[typeof listenValues] = new Map();

    [requestContext](key: string | symbol) {
      if (this[listenKeys].size === 0) return;
      const requestContextEvent = new CustomEvent<RequestContextEventDetail>('request-context', {
        bubbles: true,
        composed: true,
        detail: {
          key: key,
          consumer: this,
        },
      });
      this.dispatchEvent(requestContextEvent);
    }
    [handleRequestContext]<C>(event: CustomEvent<RequestContextEventDetail>) {
      const { key, consumer } = event.detail;
      // 如果该上下文请求事件来自除自身外的其他 consumer, 则响应该事件并打断其传播
      if (this[provideKeys].has(key) && this !== (consumer as unknown as typeof this)) {
        event.stopPropagation(); // 阻止事件传播到外部 provider
        ContextManager.getInstance().addConsumer(key, this, consumer);
        if (this[provideValues].get(key) === undefined) this[provideValues].set(key, {} as C);
        ContextManager.getInstance().updateContext<C>(key, this, this[provideValues].get(key), []);
      }
    }

    [setContext]<C>(key: string | symbol, value: C, changedKeys: string[]) {
      this[listenValues].set(key, value);

      if (this[contextListeners].has(key)) {
        this[contextListeners]
          .get(key)!
          .forEach((listener) => listener(this[listenValues].get(key), changedKeys));
      }
    }

    [updateContext]<C>(key: string | symbol, value: Partial<C>, notify = true) {
      if (this[provideValues].get(key) === undefined) this[provideValues].set(key, {} as C);
      Object.assign(this[provideValues].get(key), value);
      if (notify)
        ContextManager.getInstance().updateContext(
          key,
          this,
          this[provideValues].get(key),
          Object.keys(value)
        );
    }

    constructor(args: T) {
      super();
      this[initProps] = args;
      setup(this as unknown as Component<T> & T);
      this[createdCallbacks].forEach((callback) => callback());
    }

    connectedCallback() {
      this[listenKeys].forEach((key) => {
        this[requestContext](key);
      });
      this[connectedCallbacks].forEach((callback) => callback());
      // 如果该组件有提供上下文，则注册到上下文管理器
      if (this[provideKeys].size > 0) {
        this.addEventListener('request-context', this[handleRequestContext] as EventListener);
        ContextManager.getInstance().addProvider(this);
      }
    }

    disconnectedCallback() {
      this[disconnectedCallbacks].forEach((callback) => callback());
      if (this[provideKeys].size > 0) {
        ContextManager.getInstance().removeProvider(this);
      }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

    adoptedCallback() {}

    static get observedAttributes() {
      return [];
    }

    render() {}
    update() {}
  };
};

type Constructor<T> = new (args: any) => T;