import { TabsContext, TabsIndicatorProps } from './interface';
import { Prototype } from '@/core/interface';
import { defineProps, useConnect, useDisconnect } from '@/core/lifecycle';
import { getContext, watchContext } from '@/core/context';
const asTabsIndicator = (p: Prototype<TabsIndicatorProps>) => {
  // props
  defineProps(p, {
    onTabChange: (context) => {},
    onTabResize: (context) => {},
  });
  // context
  let _tabChangedFlag = true;
  let _currentTabRef: HTMLElement | null = null;
  const _resizeObserver = new ResizeObserver((_) => {
    if (_tabChangedFlag) {
      _tabChangedFlag = false;
      return;
    }
    const component = p.componentRef;
    const context = getContext<TabsContext>(p, 'tabs');
    component.onTabResize(context);
  });
  watchContext<TabsContext>(p, 'tabs', (context, keys) => {
    const component = p.componentRef;
    if (_currentTabRef) _resizeObserver.unobserve(_currentTabRef as HTMLElement);
    _tabChangedFlag = true;
    _currentTabRef = context.tabRefs[context.index];
    if (_currentTabRef) _resizeObserver.observe(_currentTabRef);
    component.onTabChange(context);
  });
  useConnect(p, () => {
    const context = getContext<TabsContext>(p, 'tabs');
    if (context.tabRefs.length > 0 && context.index !== -1) {
      _currentTabRef = context.tabRefs[context.index];
      _resizeObserver.observe(_currentTabRef);
    }
  });
  useDisconnect(p, () => {
    if (_currentTabRef) _resizeObserver.unobserve(_currentTabRef as HTMLElement);
  });
};

export default asTabsIndicator;
