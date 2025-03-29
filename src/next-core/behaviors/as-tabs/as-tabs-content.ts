import { PrototypeHooks } from '@/next-core/interface';
import { TabsContext, TabsContextType } from './interface';

const asTabsContent = (hooks: PrototypeHooks) => {
  const { getProps, useState, watchContext, getContext, useMounted, defineProps } = hooks;
  // props
  defineProps({ value: '' });

  // ui-state
  const state = useState<'active' | 'inactive'>('inactive', 'data-state');

  // context
  const _handleContextChange = (context: TabsContextType) => {
    const { value } = getProps();
    if (context.tabValue === value) state.set('active');
    if (context.tabValue !== value) state.set('inactive');
  };
  watchContext(TabsContext, (context, keys) => {
    if (keys.includes('tabValue')) _handleContextChange(context);
  });
  useMounted(() => {
    const context = getContext(TabsContext);
    _handleContextChange(context);
  });
};

export default asTabsContent;
