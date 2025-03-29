import { PrototypeHooks } from '@/next-core/interface';
import { TabsProps, TabsContext, TabsContextType } from './interface';

const asTabs = (hooks: PrototypeHooks<TabsProps>) => {
  const { provideContext, getProps, defineProps, getContext } = hooks;
  // props
  defineProps({
    defaultValue: '',
    onTabChange: () => {},
  });

  // context
  provideContext(TabsContext, (updateContext) => {
    const props = getProps();

    const context: TabsContextType = {
      tabValue: props.defaultValue ?? '',
      defaultValue: props.defaultValue ?? '',
      tabs: [],
      tabRefs: [],
      index: -1,
      changeTab: (value, focus = false) => {
        const _index = context.tabs.indexOf(value);
        updateContext({ index: _index, tabValue: value });
        props.onTabChange(context);
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
        const context = getContext(TabsContext);
        context.changeTab(value, focus);
      },
    },
  };
};

export default asTabs;
