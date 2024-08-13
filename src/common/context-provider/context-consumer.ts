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
  private _contextValue = {} as T;
  private _key = '';

  onContextChange: (value: T) => void = () => {};

  // prettier-ignore
  get contextValue() { return this._contextValue; }
  // prettier-ignore
  get key() { return this._key; }

  constructor() {
    super();
    this._key = this.getAttribute('key') || '';
  }

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
    if (!this.key) throw new Error('context-consumer requires a "key" attribute.');
    this[requestContextSymbol]();
  }

  [setConsumerContextSymbol](value: T) {
    this._contextValue = value;
    this.onContextChange(value);
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
