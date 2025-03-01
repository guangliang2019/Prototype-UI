import { TabsContext, TabsProps } from './interface';
import { Prototype } from '@/core/interface';
import { defineProps } from '@/core/lifecycle';
import { getContext, provideContext } from '@/core/context';

const asTabs = (p: Prototype<TabsProps>) => {
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
  provideContext<TabsContext>(p, 'tabs', (updateContext) => {
    const component = p.componentRef;
    return {
      tabValue: component.defaultValue ?? '',
      defaultValue: component.defaultValue ?? '',
      tabs: [],
      tabRefs: [],
      index: -1,
      changeTab: (value, focus = false) => {
        const context = getContext<TabsContext>(p, 'tabs');
        const _index = context.tabs.indexOf(value);
        updateContext({ index: _index, tabValue: value });

        component.onTabChange(context);
        if (focus) {
          const _targetIndex = context.tabs.findIndex((tab) => tab === value);
          if (_targetIndex !== -1) context.tabRefs[_targetIndex].focus();
        }
      },
    };
  });
};

export default asTabs;
