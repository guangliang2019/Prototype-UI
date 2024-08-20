import { ContextConsumer } from '../../common/context';
import { TabContext, TabContentProps } from './interface';

export default class PrototypeTabContent
  extends ContextConsumer<TabContext>
  implements TabContentProps
{
  protected _key = 'prototype-tab';
  private _value = '';
  // prettier-ignore
  get value(): string { return this._value; }

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';
    this.onContextChange = (value) => {
      if (value.tabValue === this._value) this.style.display = 'unset';
      if (value.tabValue !== this._value) this.style.display = 'none';
    };
  }
}

customElements.define('prototype-tab-content', PrototypeTabContent);
