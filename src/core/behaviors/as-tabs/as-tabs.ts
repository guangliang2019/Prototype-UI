import { PrototypeAPI } from '@/core/interface';
import {
  DEFAULT_TABS_PROPS,
  TabsContext,
  TabsContextType,
  TabsExposes,
  TabsProps,
} from './interface';

const asTabs = <Props extends TabsProps = TabsProps, Exposes extends TabsExposes = TabsExposes>(
  p: PrototypeAPI<Props, Exposes>
) => {
  // props
  p.props.define(DEFAULT_TABS_PROPS as Props);

  // context
  p.context.provide(TabsContext, (updateContext) => {
    const props = p.props.get();

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

  // exposes
  p.expose.define('changeTab', (value: string, focus?: boolean) => {
    const context = p.context.get(TabsContext);
    context.changeTab(value, focus);
  });
};

export default asTabs;
