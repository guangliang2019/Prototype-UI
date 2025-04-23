import { PrototypeAPI } from '@/core/interface';
import {
  DEFAULT_TABS_INDICATOR_PROPS,
  TabsContext,
  TabsIndicatorExposes,
  TabsIndicatorProps,
} from './interface';

const asTabsIndicator = <
  Props extends TabsIndicatorProps = TabsIndicatorProps,
  Exposes extends TabsIndicatorExposes = TabsIndicatorExposes,
>(
  p: PrototypeAPI<Props, Exposes>
) => {
  // props
  p.props.define(DEFAULT_TABS_INDICATOR_PROPS as Props);

  // inner state
  let _tabChangedFlag = false;
  let _currentTabRef: HTMLElement | null = null;

  // resize observer
  const _resizeObserver = new ResizeObserver((_) => {
    if (_tabChangedFlag) {
      _tabChangedFlag = false;
      return;
    }
    const props = p.props.get();
    const context = p.context.get(TabsContext);
    props.onTabResize(context);
  });

  // context
  p.context.watch(TabsContext, (context, keys) => {
    if (keys.includes('tabValue')) {
      const props = p.props.get();
      if (_currentTabRef) _resizeObserver.unobserve(_currentTabRef as HTMLElement);
      _tabChangedFlag = true;
      _currentTabRef = context.tabRefs[context.index];
      if (_currentTabRef) _resizeObserver.observe(_currentTabRef);
      props.onTabChange(context);
    }
  });

  // life cycle
  p.lifecycle.onMounted(() => {
    const context = p.context.get(TabsContext);
    if (context.tabRefs.length > 0 && context.index !== -1) {
      _currentTabRef = context.tabRefs[context.index];
      _resizeObserver.observe(_currentTabRef);
    }
  });
  p.lifecycle.onBeforeUnmount(() => {
    if (_currentTabRef) _resizeObserver.unobserve(_currentTabRef as HTMLElement);
  });
};

export default asTabsIndicator;
