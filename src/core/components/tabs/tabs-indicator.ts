import { ContextConsumer } from '@/components/common';
import { TabsContext, TabsIndicatorProps } from './interface';
import { Prototype } from '@/core/interface';
import { defineProps } from '@/core/lifecycle';
import { getContext, watchContext } from '@/core/context';

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

const asTabsIndicator = (p: Prototype<TabsIndicatorProps>) => {
  // props
  defineProps(p, {
    onTabChange: (context) => {},
    onTabResize: (context) => {},
  });
  // context
  let _tabChangedFlag = true;
  const _resizeObserver = new ResizeObserver((_) => {
    if (_tabChangedFlag) {
      _tabChangedFlag = false;
      return;
    }
    const component = p.componentRef;
    const context = getContext<TabsContext>(p, 'tabs');
    component.onTabResize(context);
  });
  watchContext(p, 'tabs', (context, keys) => {});
};
