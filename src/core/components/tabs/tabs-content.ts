import { TabsContentProps, TabsContext } from './interface';
import { Prototype } from '@/core/interface';
import { defineProps, useAttributeState, useConnect } from '@/core/lifecycle';
import { getContext, watchContext } from '@/core/context';

const asTabsContent = (p: Prototype<TabsContentProps>) => {
  // props
  defineProps(p, { value: '' });
  // ui-state
  const state = useAttributeState<'active' | 'inactive'>(p, 'state', 'inactive');
  // context
  const _handleContextChange = (context: TabsContext) => {
    const component = p.componentRef;
    if (context.tabValue === component.value) state.value = 'active';
    if (context.tabValue !== component.value) state.value = 'inactive';
  };
  watchContext<TabsContext>(p, 'tabs', (context, keys) => {
    if (keys.includes('tabValue')) _handleContextChange(context);
  });
  useConnect(p, () => {
    const context = getContext<TabsContext>(p, 'tabs');
    _handleContextChange(context);
  });
};

export default asTabsContent;
