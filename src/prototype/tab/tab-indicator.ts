import { ContextConsumer } from '@/common';
import { TabContext, TabIndicatorProps } from './interface';

export default class PrototypeTabIndicator
  extends ContextConsumer<{
    'prototype-tab': TabContext;
  }>
  implements TabIndicatorProps
{
  protected _consumerKeys = new Set(['prototype-tab'] as const);
  private _currentTabRef: HTMLElement | null = null;
  private _resizeObserver = new ResizeObserver((_) => {
    if (this._tabChangedFlag) {
      this._tabChangedFlag = false;
      return;
    }
    this.onTabResize(this.contextValues['prototype-tab']);
  });

  private _tabChangedFlag = false;

  onTabChange: (context: TabContext) => void = () => {};
  onTabResize: (context: TabContext) => void = () => {};

  connectedCallback() {
    super.connectedCallback();
    const context = this._contextValues['prototype-tab'];
    if (context.tabRefs.length > 0 && context.index !== -1) {
      this._currentTabRef = context.tabRefs[context.index];
      this._resizeObserver.observe(this._currentTabRef);
    }

    this.onContextChange = (key, value) => {
      if (key !== 'prototype-tab') return;
      if (this._currentTabRef) this._resizeObserver.unobserve(this._currentTabRef as HTMLElement);
      this._tabChangedFlag = true;
      this._currentTabRef = value.tabRefs[context.index];
      if (this._currentTabRef) this._resizeObserver.observe(this._currentTabRef);
      this.onTabChange(value);
    };
  }
}

customElements.define('prototype-tab-indicator', PrototypeTabIndicator);
