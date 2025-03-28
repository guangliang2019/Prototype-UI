import { PrototypeHooks } from '@/next-core/interface';
import { asTabsContext, TabsContext } from './interface';

const asTabsContent = (hooks: PrototypeHooks) => {
  const { getProps, useState, watchContext, getContext, useMounted, defineProps } = hooks;
  // props
  defineProps({ value: '' });

  // ui-state
  const state = useState<'active' | 'inactive'>('inactive', 'state');
  // context
  const _handleContextChange = (context: TabsContext) => {
    const { value } = getProps();
    if (context.tabValue === value) state.set('active');
    if (context.tabValue !== value) state.set('inactive');
  };

  watchContext(asTabsContext, (context, keys) => {
    if (keys.includes('tabValue')) _handleContextChange(context);
  });
  useMounted(() => {
    const context = getContext(asTabsContext);
    _handleContextChange(context);
  });
};

export default asTabsContent;
