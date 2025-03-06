import { TabsContext, TabsTriggerProps } from './interface';
import { binarySearch } from '@/www/utils/search';
import { compareDOM } from '@/www/utils/dom';
import { Prototype } from '@/core/interface';
import { defineProps, useAttributeState, useConnect, useDisconnect } from '@/core/lifecycle';
import { getContext, watchContext } from '@/core/context';
import useEventListener from '@/core/hooks/use-event-listener';

const asTabsTrigger = (p: Prototype<TabsTriggerProps>) => {
  // props
  defineProps(p, { value: '' });
  // ui-state
  const state = useAttributeState<'active' | 'inactive'>(p, 'state', 'inactive');
  // context

  const _handleContextChange = (context: TabsContext) => {
    const component = p.componentRef;
    if (context.tabValue === component.value) {
      component.tabIndex = 0;
      state.value = 'active';
      if (context.index === -1) context.index = context.tabs.indexOf(component.value);
    } else {
      component.tabIndex = -1;
      state.value = 'inactive';
    }
  };
  watchContext<TabsContext>(p, 'tabs', (context, keys) => {
    if (keys.includes('tabValue')) _handleContextChange(context);
  });
  useConnect(p, () => {
    const context = getContext<TabsContext>(p, 'tabs');
    const component = p.componentRef;
    const insertIndex = binarySearch(context.tabRefs, component, compareDOM);
    context.tabRefs.splice(insertIndex, 0, component);
    context.tabs.splice(insertIndex, 0, component.value);
    _handleContextChange(context);
  });
  useDisconnect(p, () => {
    const context = getContext<TabsContext>(p, 'tabs');
    const component = p.componentRef;
    const removeIndex = binarySearch(context.tabRefs, component, compareDOM);
    context.tabs.splice(removeIndex, 1);
    context.tabRefs.splice(removeIndex, 1);
  });
  // event
  useEventListener(p, 'click', () => {
    const component = p.componentRef;
    const context = getContext<TabsContext>(p, 'tabs');
    context.changeTab(component.value);
  });
  useEventListener(p, 'keydown', (e) => {
    const event = e as KeyboardEvent;
    const context = getContext<TabsContext>(p, 'tabs');
    const component = p.componentRef;
    const currentIndex = context.tabs.indexOf(component.value);
    const nextIndex = (currentIndex + 1) % context.tabs.length;
    const prevIndex = (currentIndex - 1 + context.tabs.length) % context.tabs.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      context.changeTab(context.tabs[nextIndex], true);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      context.changeTab(context.tabs[prevIndex], true);
    }
  });
};

export default asTabsTrigger;
