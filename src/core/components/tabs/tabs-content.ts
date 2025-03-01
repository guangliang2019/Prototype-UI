import { TabsContentProps } from './interface';
import { Prototype } from '@/core/interface';
import { defineProps, useAttributeState } from '@/core/lifecycle';
import { watchContext } from '@/core/context';

const asTabsContent = (p: Prototype<TabsContentProps>) => {
  // props
  defineProps(p, { value: '' });
  // ui-state
  const state = useAttributeState<'active' | 'inactive'>(p, 'state', 'inactive');
  // context
  watchContext(p, 'tabs', (context, _) => {
    const component = p.componentRef;
    if (context.tabValue === component.value) state.value = 'active';
    if (context.tabValue !== component.value) state.value = 'inactive';
  });
};

export default asTabsContent;
