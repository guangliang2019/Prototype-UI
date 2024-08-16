/**
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/context-provider/context-consumer.ts
 * @author guangliang2019
 * @date 2024-08-13
 */

import type { ContextConsumerProps, RequestContextEventDetail } from './interface';
export const setConsumerContextSymbol = Symbol('setConsumerContext');
export const requestContextSymbol = Symbol('requestContext');

export default class ContextConsumer<T extends Object>
  extends HTMLElement
  implements ContextConsumerProps<T>
{
  protected _contextValue = {} as T;
  protected _key = '';

  onContextChange: (value: T) => void = () => {};

  // prettier-ignore
  get contextValue() { return this._contextValue; }
  // prettier-ignore
  get key() { return this._key; }

  static get observedAttributes() {
    return ['onContextChange'];
  }

  attributeChangedCallback(name: string, _: any, newValue: any) {
    const mapping: Record<string, any> = {
      'on-context-change': () => (this.onContextChange = new Function(newValue) as () => void),
    };
    mapping[name]?.();
  }

  connectedCallback() {
    // 仅在单独使用时从属性中读取 key，其余时间当作基类使用，有子类直接赋值 key
    if (this.tagName === 'CONTEXT-CONSUMER') this._key = this.getAttribute('key') || '';
    this[requestContextSymbol]();
  }

  [setConsumerContextSymbol](value: Partial<T>) {
    this._contextValue = { ...this._contextValue, ...value };
    this.onContextChange(this._contextValue);
  }

  [requestContextSymbol]() {
    const requestContextEvent = new CustomEvent<RequestContextEventDetail<T>>('request-context', {
      bubbles: true,
      composed: true,
      detail: {
        key: this.key,
        consumer: this,
      },
    });
    this.dispatchEvent(requestContextEvent);
  }
}

customElements.define('context-consumer', ContextConsumer);
