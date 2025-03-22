import { PrototypeHooks } from '@/next-core/interface';
import { TabsProps, TabsContext, asTabsContext } from './interface';

const asTabs = (hooks: PrototypeHooks<TabsProps>) => {
  // props
  // defineProps(
  //   p,
  //   {
  //     defaultValue: '',
  //     onTabChange: () => {},
  //     changTab: (value, focus = false) => {
  //       const context = getContext<TabsContext>(p, 'tabs');
  //       context.changeTab(value, focus);
  //     },
  //   },
  //   (key, _) => {
  //     if (key === 'changTab') throw new Error('changTab is readonly');
  //   }
  // );

  const { provideContext, getProps } = hooks;

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
        props.onTabChange(context);
        if (focus) {
          const _targetIndex = context.tabs.findIndex((tab) => tab === value);
          if (_targetIndex !== -1) context.tabRefs[_targetIndex].focus();
        }
      },
    };
    return context;
  });
};

export default asTabs;
