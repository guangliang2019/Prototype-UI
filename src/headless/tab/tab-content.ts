import { ContextConsumer } from '../../common/context-provider';
import { TabContext, TabContentProps } from './interface';

export default class HeadlessTabContent
  extends ContextConsumer<TabContext>
  implements TabContentProps
{
  private _value = '';
  // prettier-ignore
  get value(): string { return this._value; }

  connectedCallback() {
    this._key = 'headless-tab';
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';
    this._render();
  }

  private _render() {
    this.onContextChange = (value) => {
      if (value.tabValue === this._value) {
        this.style.display = 'unset';
      }
      if (value.tabValue !== this._value) {
        this.style.display = 'none';
      }
    };
  }
}

customElements.define('headless-tab-content', HeadlessTabContent);
