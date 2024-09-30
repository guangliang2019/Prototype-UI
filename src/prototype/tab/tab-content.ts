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

  private _handlePrototypeTabContextChange = (context: TabContext) => {
    if (context.tabValue === this._value) this.style.display = 'unset';
    if (context.tabValue !== this._value) this.style.display = 'none';
  };

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';

    this.addContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }

  disconnectedCallback() {
    this.removeContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }
}

customElements.define('prototype-tab-content', PrototypeTabContent);
