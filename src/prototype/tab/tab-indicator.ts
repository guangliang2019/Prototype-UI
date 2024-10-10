import { ContextConsumer } from '@/common';
import { PrototypeTabContext, TabIndicatorProps } from './interface';

export default class PrototypeTabIndicator
  extends ContextConsumer<PrototypeTabContext>
  implements TabIndicatorProps
{
  protected _consumerKeys =(['prototype-tab'] as const);
  private _currentTabRef: HTMLElement | null = null;
  private _resizeObserver = new ResizeObserver((_) => {
    if (this._tabChangedFlag) {
      this._tabChangedFlag = false;
      return;
    }
    this.onTabResize(this.contextValues['prototype-tab']);
  });

  private _tabChangedFlag = false;

  private _handlePrototypeTabContextChange = (context: PrototypeTabContext['prototype-tab']) => {
    if (this._currentTabRef) this._resizeObserver.unobserve(this._currentTabRef as HTMLElement);
    this._tabChangedFlag = true;
    this._currentTabRef = context.tabRefs[context.index];
    if (this._currentTabRef) this._resizeObserver.observe(this._currentTabRef);
    this.onTabChange(context);
  };

  onTabChange: (context: PrototypeTabContext['prototype-tab']) => void = () => {};
  onTabResize: (context: PrototypeTabContext['prototype-tab']) => void = () => {};

  connectedCallback() {
    super.connectedCallback();
    const context = this._contextValues['prototype-tab'];
    if (context.tabRefs.length > 0 && context.index !== -1) {
      this._currentTabRef = context.tabRefs[context.index];
      this._resizeObserver.observe(this._currentTabRef);
    }

    this.addContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }

  disconnectedCallback() {
    this._resizeObserver.unobserve(this._currentTabRef as HTMLElement);
    this.removeContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }
}

customElements.define('prototype-tab-indicator', PrototypeTabIndicator);
