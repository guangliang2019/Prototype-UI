/**
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/context-provider/context-provider.ts
 * @author guangliang2019
 * @date 2024-08-13
 */

import ContextConsumer from './contextConsumer';
import ContextManager from './contextManager';
import type { ContextProviderProps, RequestContextEventDetail } from './interface';

export default abstract class ContextProvider<
    TProvider extends Record<string, Object>,
    TConsumer extends Record<string, Object> = {}
  >
  extends ContextConsumer<TConsumer>
  implements ContextProviderProps<TProvider, TConsumer>
{
  protected abstract _providerKeys: Set<keyof TProvider>;
  protected _provideValues = {} as TProvider;
  protected _consumerKeys: Set<keyof TConsumer> = new Set([] as const);

  // prettier-ignore
  get provideValues() { return this._provideValues; }
  // prettier-ignore
  get providerKeys() { return this._providerKeys; }

  constructor() {
    super();
    this.handleRequestContext = this.handleRequestContext.bind(this);
  }

  connectedCallback() {
    this.addEventListener('request-context', this.handleRequestContext as EventListener);
    ContextManager.getInstance().addProvider(this);
  }

  disconnectedCallback() {
    this.removeEventListener('request-context', this.handleRequestContext as EventListener);
    ContextManager.getInstance().removeProvider(this);
  }

  setContext<K extends keyof TProvider>(key: K, value: Partial<TProvider[K]>, notify = true) {
    if (this._provideValues[key] === undefined) this._provideValues[key] = {} as TProvider[K];
    Object.assign(this._provideValues[key], value);
    if (notify)
      ContextManager.getInstance().updateContext(
        key,
        this,
        this._provideValues[key],
        Object.keys(value) as (keyof TProvider[K])[]
      );
  }

  private handleRequestContext(event: CustomEvent<RequestContextEventDetail<TProvider>>) {
    const { key, consumer } = event.detail;
    // 如果该上下文请求事件来自除自身外的其他 consumer, 则响应该事件并打断其传播
    if (this._providerKeys.has(key) && this !== (consumer as unknown as typeof this)) {
      event.stopPropagation(); // 阻止事件传播到外部 provider
      ContextManager.getInstance().addConsumer(key, this, consumer);
      if (this._provideValues[key] === undefined)
        this._provideValues[key] = {} as TProvider[typeof key];
      ContextManager.getInstance().updateContext<TProvider, typeof key>(
        key,
        this,
        this._provideValues[key],
        Object.keys(this._provideValues[key]) as (keyof TProvider[typeof key])[]
      );
    }
  }
}
