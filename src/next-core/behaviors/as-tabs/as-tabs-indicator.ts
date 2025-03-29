import { PrototypeHooks } from '@/next-core/interface';
import { TabsContext, TabsIndicatorProps } from './interface';

const asTabsIndicator = (hooks: PrototypeHooks<TabsIndicatorProps>) => {
  const { useMounted, useUnmounted, getContext, defineProps, getProps, watchContext } = hooks;

  // props
  defineProps({
    onTabChange: () => {},
    onTabResize: () => {},
  });

  // inner state
  let _tabChangedFlag = false;
  let _currentTabRef: HTMLElement | null = null;

  // resize observer
  const _resizeObserver = new ResizeObserver((_) => {
    if (_tabChangedFlag) {
      _tabChangedFlag = false;
      return;
    }
    const props = getProps();
    const context = getContext(TabsContext);
    props.onTabResize(context);
  });

  // context
  watchContext(TabsContext, (context, keys) => {
    if (keys.includes('tabValue')) {
      const props = getProps();
      if (_currentTabRef) _resizeObserver.unobserve(_currentTabRef as HTMLElement);
      _tabChangedFlag = true;
      _currentTabRef = context.tabRefs[context.index];
      if (_currentTabRef) _resizeObserver.observe(_currentTabRef);
      props.onTabChange(context);
    }
  });

  // life cycle
  useMounted(() => {
    const context = getContext(TabsContext);
    if (context.tabRefs.length > 0 && context.index !== -1) {
      _currentTabRef = context.tabRefs[context.index];
      _resizeObserver.observe(_currentTabRef);
    }
  });
  useUnmounted(() => {
    _resizeObserver.unobserve(_currentTabRef as HTMLElement);
  });
};

export default asTabsIndicator;
