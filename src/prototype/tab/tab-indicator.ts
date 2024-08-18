import { ContextConsumer } from '../../common/context-provider';
import { TabContext, TabIndicatorProps } from './interface';

export default class PrototypeTabIndicator
  extends ContextConsumer<TabContext>
  implements TabIndicatorProps
{
  private _currentTabRef: HTMLElement | null = null;
  private _resizeObserver = new ResizeObserver((_) => {
    this.onTabResize(this.contextValue);
  });

  onTabChange: (context: TabContext) => void = () => {};
  onTabResize: (context: TabContext) => void = () => {};

  constructor() {
    super();
    this._key = 'prototype-tab';
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._contextValue.index !== -1) {
      this._currentTabRef = this._contextValue.tabRefs[this._contextValue.index];
      this._resizeObserver.observe(this._currentTabRef);
    }

    this.onContextChange = (value) => {
      if (this._currentTabRef) this._resizeObserver.unobserve(this._currentTabRef as HTMLElement);
      this._currentTabRef = value.tabRefs[this._contextValue.index];
      this._resizeObserver.observe(this._currentTabRef);
      this.onTabChange(value);
    };
  }
}

customElements.define('prototype-tab-indicator', PrototypeTabIndicator);