import { PrototypeAPI } from '@/core/interface';
import {
  TabsContext,
  TabsContextType,
  TabsContentExposes,
  TabsContentProps,
  DEFAULT_TABS_CONTENT_PROPS,
} from './interface';

const asTabsContent = <
  Props extends TabsContentProps = TabsContentProps,
  Exposes extends TabsContentExposes = TabsContentExposes,
>(
  p: PrototypeAPI<Props, Exposes>
) => {
  // props
  p.props.define(DEFAULT_TABS_CONTENT_PROPS as Props);

  // ui-state
  const state = p.state.define<'active' | 'inactive'>('inactive', 'data-state');

  // context
  const _handleContextChange = (context: TabsContextType) => {
    const { value } = p.props.get();
    if (context.tabValue === value) state.set('active');
    if (context.tabValue !== value) state.set('inactive');
  };
  p.context.watch(TabsContext, (context, keys) => {
    if (keys.includes('tabValue')) _handleContextChange(context);
  });
  p.lifecycle.onMounted(() => {
    const context = p.context.get(TabsContext);
    _handleContextChange(context);
  });
};

export default asTabsContent;
