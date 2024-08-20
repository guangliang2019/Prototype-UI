import { ContextProvider } from '../../common/context-provider';
import { TabContext, TabProps } from './interface';

export default class PrototypeTab extends ContextProvider<TabContext> implements TabProps {
  private _defaultValue = '';
  // prettier-ignore
  get defaultValue(): string { return this._defaultValue; }

  private _index: number = -1;
  private _tabValue = '';
  private _tabRefs: HTMLElement[] = [];
  private _tabs: string[] = [];

  constructor() {
    super();
    this._key = 'prototype-tab';
  }

  connectedCallback() {
    super.connectedCallback();
    this._defaultValue = this.getAttribute('default-value') || '';
    this._index = this._tabs.indexOf(this._defaultValue);
    this.setContext({
      tabValue: this._tabValue,
      tabs: this._tabs,
      tabRefs: this._tabRefs,
      index: this._index,
      defaultValue: this._defaultValue,
      changeTab: (value, focus = false) => {
        this._index = this._tabs.indexOf(value);
        this.setContext({ index: this._index, tabValue: value });
        if (focus) {
          const targetIndex = this._tabs.findIndex((tab) => tab === value);
          if (targetIndex !== -1) this._tabRefs[targetIndex].focus();
        }
      },
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-tab', PrototypeTab);
