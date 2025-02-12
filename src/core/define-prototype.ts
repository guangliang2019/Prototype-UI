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
import { ContextManager } from './context';
import { FC, Hook, Prototype, Constructor, RequestContextEventDetail } from './interface';

const throwShouldBeOverwritten = (functionName: string) => {
  throw new Error(`${functionName} should be overwritten with adapter.`);
};

/**
 * Define a component prototype.
 *
 * @param setup
 * A function to declare your component, you can use **hooks** in setup.
 *
 * Should return a `HTMLElement` or `void`.
 * @returns A Object, should be used by adapter.
 */
export const definePrototype = <T extends Record<string, any>>(
  setup: Hook<T> | FC<T>
): Constructor<Prototype<T>> => {
  return class implements Prototype<T> {
    componentRef = null as any;
    [canUseHooksFlag] = true;

    [initProps] = {} as T;
    // lifecycle
    [createdCallbacks]: Set<() => void> = new Set();
    [connectedCallbacks]: Set<() => void> = new Set();
    [disconnectedCallbacks]: Set<() => void> = new Set();
    [attributeListeners] = new Map();
    // context
    [contextListeners]: Map<string | symbol, Set<(context: any, changedKeys: string[]) => void>> =
      new Map();
    [provideValues]: Map<string | symbol, any> = new Map();
    [provideKeys]: Set<string | symbol> = new Set();
    [listenKeys]: Set<string | symbol> = new Set();
    [listenValues]: Map<string | symbol, any> = new Map();

    [requestContext] = (key: string | symbol) => {
      if (this[listenKeys].size === 0) return;
      const requestContextEvent = new CustomEvent('request-context', {
        bubbles: true,
        composed: true,
        detail: { key: key, consumer: this },
      });
      this.componentRef.dispatchEvent(requestContextEvent);
    };
    [handleRequestContext] = (event: CustomEvent<RequestContextEventDetail>) => {
      const { key, consumer } = event.detail;
      // 如果该上下文请求事件来自除自身外的其他 consumer, 则响应该事件并打断其传播
      if (this[provideKeys].has(key) && this !== (consumer as unknown as typeof this)) {
        event.stopPropagation(); // 阻止事件传播到外部 provider
        ContextManager.getInstance().addConsumer(key, this, consumer);
        if (this[provideValues].get(key) === undefined) this[provideValues].set(key, {});
        ContextManager.getInstance().updateContext(key, this, this[provideValues].get(key), []);
      }
    };
    [setContext] = <C>(key: string | symbol, value: Partial<C>, changedKeys: string[]) => {
      this[listenValues].set(key, value);

      if (this[contextListeners].has(key)) {
        this[contextListeners]
          .get(key)!
          .forEach((listener) => listener(this[listenValues].get(key), changedKeys));
      }
    };

    [updateContext] = <C>(key: string | symbol, context: Partial<C>, notify = true) => {
      if (this[provideValues].get(key) === undefined) this[provideValues].set(key, {});
      Object.assign(this[provideValues].get(key), context);
      if (notify)
        ContextManager.getInstance().updateContext(
          key,
          this,
          this[provideValues].get(key),
          Object.keys(context)
        );
    };

    render = () => throwShouldBeOverwritten('render') as Prototype<T>['render'];
    update = () => throwShouldBeOverwritten('update') as Prototype<T>['update'];

    constructor() {
      setup(this);
    }
  };
};
