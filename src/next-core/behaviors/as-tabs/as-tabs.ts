import { Prototype, PrototypeHooks } from '@/next-core/interface';
import { TabsProps, TabsContext } from './interface';
import { defineContext } from '@/next-core/adapter/context';

export const asTabsContext = defineContext('as-tabs');

const asTabs = (hooks: PrototypeHooks<TabsProps>) => {
  // props
  defineProps(
    p,
    {
      defaultValue: '',
      onTabChange: () => {},
      changTab: (value, focus = false) => {
        const context = getContext<TabsContext>(p, 'tabs');
        context.changeTab(value, focus);
      },
    },
    (key, _) => {
      if (key === 'changTab') throw new Error('changTab is readonly');
    }
  );
  // context
  hooks.provideContext<TabsContext>(asTabsContext, (updateContext) => {
    const props = hooks.getProps();

    const context: TabsContext = {
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

  provideContext<TabsContext>(p, 'tabs');
};

export default asTabs;
