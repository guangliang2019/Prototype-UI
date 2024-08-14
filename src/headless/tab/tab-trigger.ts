import { ContextConsumer } from '../../common/context-provider';
import { TabContext, TabTrigerProps } from './interface';

export default class HeadlessTabTrigger
  extends ContextConsumer<TabContext>
  implements TabTrigerProps
{
  private _value = '';

  get value(): string {
    return this._value;
  }

  connectedCallback() {
    this._key = 'headless-tab';
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';
    this._render();
  }

  private _render() {
    this.addEventListener('click', () => {
      this.contextValue.changeTab(this._value);
    });
  }
}

customElements.define('headless-tab-trigger', HeadlessTabTrigger);
