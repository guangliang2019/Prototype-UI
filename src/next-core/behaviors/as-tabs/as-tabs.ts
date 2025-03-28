import { PrototypeHooks } from '@/next-core/interface';
import { TabsProps, TabsContext, asTabsContext } from './interface';

const asTabs = (hooks: PrototypeHooks<TabsProps>) => {
  const { provideContext, getProps, defineProps, watchProps, getContext } = hooks;
  // props
  defineProps({
    defaultValue: '',
    onTabChange: () => {},
    changTab: (value, focus = false) => {
      const context = getContext<TabsContext>(asTabsContext);
      context.changeTab(value, focus);
    },
  });
  watchProps(['changTab'], () => {
    throw new Error('changTab is readonly');
  });

  // context
  provideContext(asTabsContext, (updateContext) => {
    const props = getProps();

    const context: TabsContext = {
      tabValue: props.defaultValue ?? '',
      defaultValue: props.defaultValue ?? '',
      tabs: [],
      tabRefs: [],
      index: -1,
      changeTab: (value, focus = false) => {
        const _index = context.tabs.indexOf(value);
        updateContext({ index: _index, tabValue: value });
        // props.onTabChange(context);
        if (focus) {
          const _targetIndex = context.tabs.findIndex((tab) => tab === value);
          if (_targetIndex !== -1) context.tabRefs[_targetIndex].focus();
        }
      },
    };
    return context;
  });

  return {
    expose: {
      changeTab: (value: string, focus?: boolean) => {
        const context = getContext<TabsContext>(asTabsContext);
        context.changeTab(value, focus);
      },
    },
  };
};

export default asTabs;
