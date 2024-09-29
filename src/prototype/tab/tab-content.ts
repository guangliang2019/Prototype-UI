import { ContextConsumer } from '@/common';
import { TabContext, TabContentProps } from './interface';

export default class PrototypeTabContent
  extends ContextConsumer<{
    'prototype-tab': TabContext;
  }>
  implements TabContentProps
{
  protected _consumerKeys = new Set(['prototype-tab'] as const);
  private _value = '';
  // prettier-ignore
  get value(): string { return this._value; }

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';
    this.onContextChange = (key, value) => {
      if (key !== 'prototype-tab') return;
      if (value.tabValue === this._value) this.style.display = 'unset';
      if (value.tabValue !== this._value) this.style.display = 'none';
    };
  }
}

customElements.define('prototype-tab-content', PrototypeTabContent);
