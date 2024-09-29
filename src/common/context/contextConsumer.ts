/**
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/context-provider/context-consumer.ts
 * @author guangliang2019
 * @date 2024-08-13
 */

import type { ContextConsumerProps, RequestContextEventDetail } from './interface';
export const setConsumerContextSymbol = Symbol('setConsumerContext');
export const requestContextSymbol = Symbol('requestContext');

export default abstract class ContextConsumer<T extends Record<string, Object>>
  extends HTMLElement
  implements ContextConsumerProps<T>
{
  protected _contextValues = {} as T;
  protected abstract _consumerKeys: Set<keyof T>;

  onContextChange: ContextConsumerProps<T>['onContextChange'] = () => {};

  // prettier-ignore
  get contextValues() { return this._contextValues; }
  // prettier-ignore
  get consumerKeys() { return this._consumerKeys; }

  static get observedAttributes() {
    return ['onContextChange'];
  }
  connectedCallback() {
    this.consumerKeys.forEach(this[requestContextSymbol]);
  }

  [setConsumerContextSymbol]<K extends keyof T>(key: K, value: T[K], changedKeys: (keyof T[K])[]) {
    if (this._contextValues[key] === undefined) this._contextValues[key] = {} as T[K];
    this._contextValues[key] = value;
    this.onContextChange(key, this._contextValues[key], changedKeys);
  }

  // 依托于冒泡机制, 沿 DOM 树, 向根部传递请求上下文的事件, 寻找 provider 并等待回复
  [requestContextSymbol] = (key: keyof T) => {
    const requestContextEvent = new CustomEvent<RequestContextEventDetail<T>>('request-context', {
      bubbles: true,
      composed: true,
      detail: {
        key: key,
        consumer: this,
      },
    });
    this.dispatchEvent(requestContextEvent);
  };
}
