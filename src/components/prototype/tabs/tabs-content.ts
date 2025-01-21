import { ContextConsumer } from '@/components/common';
import { PrototypeTabsContext, TabsContentProps } from './interface';

export default class PrototypeTabsContent
  extends ContextConsumer<PrototypeTabsContext>
  implements TabsContentProps
{
  protected _consumerKeys = ['prototype-tabs'];
  private _value = '';
  // prettier-ignore
  get value(): string { return this._value; }

  private _handlePrototypeTabContextChange = (context: PrototypeTabsContext['prototype-tabs']) => {
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
