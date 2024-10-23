import { ContextConsumer } from '@/common';
import { PrototypeTabsContext, TabsIndicatorProps } from './interface';

export default class PrototypeTabsIndicator
  extends ContextConsumer<PrototypeTabsContext>
  implements TabsIndicatorProps
{
  protected _consumerKeys = ['prototype-tabs'];
  private _currentTabRef: HTMLElement | null = null;
  private _resizeObserver = new ResizeObserver((_) => {
    if (this._tabChangedFlag) {
      this._tabChangedFlag = false;
      return;
    }
    this.onTabResize(this.contextValues['prototype-tabs']);
  });

  private _tabChangedFlag = false;

  private _handlePrototypeTabContextChange = (context: PrototypeTabsContext['prototype-tabs']) => {
    if (this._currentTabRef) this._resizeObserver.unobserve(this._currentTabRef as HTMLElement);
    this._tabChangedFlag = true;
    this._currentTabRef = context.tabRefs[context.index];
    if (this._currentTabRef) this._resizeObserver.observe(this._currentTabRef);
    this.onTabChange(context);
  };

  onTabChange: (context: PrototypeTabsContext['prototype-tabs']) => void = () => {};
  onTabResize: (context: PrototypeTabsContext['prototype-tabs']) => void = () => {};

  connectedCallback() {
    super.connectedCallback();
    const context = this._contextValues['prototype-tabs'];
    if (context.tabRefs.length > 0 && context.index !== -1) {
      this._currentTabRef = context.tabRefs[context.index];
      this._resizeObserver.observe(this._currentTabRef);
    }

    this.addContextListener('prototype-tabs', this._handlePrototypeTabContextChange);
  }

  disconnectedCallback() {
    this._resizeObserver.unobserve(this._currentTabRef as HTMLElement);
    this.removeContextListener('prototype-tabs', this._handlePrototypeTabContextChange);
  }
}

customElements.define('prototype-tabs-indicator', PrototypeTabsIndicator);
