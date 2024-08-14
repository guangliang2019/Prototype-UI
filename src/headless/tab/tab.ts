import { createContext } from '../../common/context-provider';
import { TabContext, TabProps } from './interface';

export default class HeadlessTab extends HTMLElement implements TabProps {
  private _defaultValue = '';
  // prettier-ignore
  get defaultValue(): string { return this._defaultValue; }

  private _tabValue = '';

  connectedCallback() {
    this._defaultValue = this.getAttribute('default-value') || '';
    this._tabValue = this._defaultValue;

    this._render();
  }

  private _render() {
    createContext<TabContext>(
      'headless-tab',
      (setContext) => ({
        tabValue: this._tabValue,
        changeTab: (value) => {
          setContext({ tabValue: value });
        },
      }),
      this
    );
  }
}

customElements.define('headless-tab', HeadlessTab);
