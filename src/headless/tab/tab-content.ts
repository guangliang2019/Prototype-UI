import { ContextConsumer } from '../../common/context-provider';
import { TabContext, TabContentProps } from './interface';

export default class HeadlessTabContent
  extends ContextConsumer<TabContext>
  implements TabContentProps
{
  private _value = '';
  // prettier-ignore
  get value(): string { return this._value; }

  constructor() {
    super();
    this._key = 'headless-tab';
  }

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';
    this.onContextChange = (value) => {
      if (value.tabValue === this._value) this.style.display = 'unset';
      if (value.tabValue !== this._value) this.style.display = 'none';
    };
  }
}

customElements.define('headless-tab-content', HeadlessTabContent);
