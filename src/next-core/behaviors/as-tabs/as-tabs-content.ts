import { PrototypeAPI } from '@/next-core/interface';
import { TabsContext, TabsContextType, TabsContentProps } from './interface';

const asTabsContent = (p: PrototypeAPI<TabsContentProps>) => {
  // props
  p.props.define({ value: '' });

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
