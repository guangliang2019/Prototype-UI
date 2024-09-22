/**
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/context-provider/context-provider.ts
 * @author guangliang2019
 * @date 2024-08-13
 */

import ContextConsumer from './contextConsumer';
import ContextManager from './contextManager';
import type { ContextProviderProps, RequestContextEventDetail } from './interface';

export default abstract class ContextProvider<T extends Object, U extends Object = {}>
  extends ContextConsumer<U>
  implements ContextProviderProps<T, U>
{
  protected abstract _providerKey: string;
  protected _provideValue: T = {} as T;

  // prettier-ignore
  get provideValue() { return this._provideValue; }
  // prettier-ignore
  get providerKey() { return this._providerKey; }

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

  setContext(value: Partial<T>, notify = true) {
    Object.assign(this._provideValue, value);
    if (notify)
      ContextManager.getInstance().updateContext<T, U>(
        this,
        this._provideValue,
        Object.keys(value)
      );
  }

  private handleRequestContext(event: CustomEvent<RequestContextEventDetail<T>>) {
    const { key, consumer } = event.detail;
    if (this._providerKey === key && this !== (consumer as unknown as typeof this)) {
      event.stopPropagation(); // 阻止事件传播到外部 provider
      ContextManager.getInstance().addConsumer(this, consumer);
      ContextManager.getInstance().updateContext(
        this,
        this._provideValue,
        Object.keys(this._provideValue)
      );
    }
  }
}
