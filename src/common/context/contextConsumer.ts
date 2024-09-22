/**
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/context-provider/context-consumer.ts
 * @author guangliang2019
 * @date 2024-08-13
 */

import type { ContextConsumerProps, RequestContextEventDetail } from './interface';
export const setConsumerContextSymbol = Symbol('setConsumerContext');
export const requestContextSymbol = Symbol('requestContext');

export default abstract class ContextConsumer<T extends Object>
  extends HTMLElement
  implements ContextConsumerProps<T>
{
  protected _contextValue = {} as T;
  protected abstract _consumerKey: string;

  onContextChange: (value: T, changedKeys?: string[]) => void = () => {};

  // prettier-ignore
  get contextValue() { return this._contextValue; }
  // prettier-ignore
  get consumerKey() { return this._consumerKey; }

  static get observedAttributes() {
    return ['onContextChange'];
  }

  connectedCallback() {
    // 仅在单独使用时从属性中读取 key，其余时间当作基类使用，有子类直接赋值 key
    if (this.tagName === 'CONTEXT-CONSUMER') this._consumerKey = this.getAttribute('key') || '';
    this[requestContextSymbol]();
  }

  [setConsumerContextSymbol](value: T, changedKeys: string[]) {
    this._contextValue = value;
    this.onContextChange(this._contextValue, changedKeys);
  }

  [requestContextSymbol]() {
    const requestContextEvent = new CustomEvent<RequestContextEventDetail<T>>('request-context', {
      bubbles: true,
      composed: true,
      detail: {
        key: this._consumerKey,
        consumer: this,
      },
    });
    this.dispatchEvent(requestContextEvent);
  }
}
