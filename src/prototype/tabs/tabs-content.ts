import { ContextConsumer } from '@/common';
import { PrototypeTabContext, TabContentProps } from './interface';

export default class PrototypeTabsContent
  extends ContextConsumer<PrototypeTabContext>
  implements TabContentProps
{
  protected _consumerKeys = ['prototype-tabs'];
  private _value = '';
  // prettier-ignore
  get value(): string { return this._value; }

  private _handlePrototypeTabContextChange = (context: PrototypeTabContext['prototype-tabs']) => {
    if (context.tabValue === this._value) this.style.display = 'unset';
    if (context.tabValue !== this._value) this.style.display = 'none';
  };

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';

    this.addContextListener('prototype-tabs', this._handlePrototypeTabContextChange);
  }

  disconnectedCallback() {
    this.removeContextListener('prototype-tabs', this._handlePrototypeTabContextChange);
  }
}

customElements.define('prototype-tabs-content', PrototypeTabsContent);
