import { ContextProvider } from '../../common/context-provider';
import { TabContext, TabProps } from './interface';

export default class HeadlessTab extends ContextProvider<TabContext> implements TabProps {
  private _defaultValue = '';
  // prettier-ignore
  get defaultValue(): string { return this._defaultValue; }

  private _tabValue = '';

  connectedCallback() {
    this._key = 'headless-tab';
    super.connectedCallback();
    this._defaultValue = this.getAttribute('default-value') || '';
    this._tabValue = this._defaultValue;
    this._render();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _render() {
    this.setContext({
      tabValue: this._tabValue,
      changeTab: (value) => {
        this.setContext({ tabValue: value });
      },
    });
  }
}

customElements.define('headless-tab', HeadlessTab);
