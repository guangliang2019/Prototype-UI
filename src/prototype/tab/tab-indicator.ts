import { ContextConsumer } from '@/common';
import { TabContext, TabIndicatorProps } from './interface';

export default class PrototypeTabIndicator
  extends ContextConsumer<TabContext>
  implements TabIndicatorProps
{
  protected _key = 'prototype-tab';
  private _currentTabRef: HTMLElement | null = null;
  private _resizeObserver = new ResizeObserver((_) => {
    if (this._tabChangedFlag) {
      this._tabChangedFlag = false;
      return;
    }
    this.onTabResize(this.contextValue);
  });

  private _tabChangedFlag = false;

  onTabChange: (context: TabContext) => void = () => {};
  onTabResize: (context: TabContext) => void = () => {};

  connectedCallback() {
    super.connectedCallback();
    if (this._contextValue.tabRefs.length > 0 && this._contextValue.index !== -1) {
      this._currentTabRef = this._contextValue.tabRefs[this._contextValue.index];
      this._resizeObserver.observe(this._currentTabRef);
    }

    this.onContextChange = (value) => {
      if (this._currentTabRef) this._resizeObserver.unobserve(this._currentTabRef as HTMLElement);
      this._tabChangedFlag = true;
      this._currentTabRef = value.tabRefs[this._contextValue.index];
      if (this._currentTabRef) this._resizeObserver.observe(this._currentTabRef);
      this.onTabChange(value);
    };
  }
}

customElements.define('prototype-tab-indicator', PrototypeTabIndicator);
