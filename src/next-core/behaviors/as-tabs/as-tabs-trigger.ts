import { PrototypeHooks } from '@/next-core/interface';
import { asTabsContext, TabsContext, TabsTriggerProps } from './interface';

const asTabsTrigger = (hooks: PrototypeHooks<TabsTriggerProps>) => {
  const {
    event,
    element,
    markAsTrigger,
    useState,
    getProps,
    useMounted,
    useUnmounted,
    watchContext,
    getContext,
  } = hooks;

  markAsTrigger();

  // ui-state
  const state = useState<'active' | 'inactive'>('inactive', 'state');
  // context

  const _handleContextChange = (context: TabsContext) => {
    const { value } = getProps();
    if (context.tabValue === value) {
      event.focus.setPriority(0);
      state.set('active');
      if (context.index === -1) context.index = context.tabs.indexOf(value);
    } else {
      event.focus.setPriority(-1);
      state.set('inactive');
    }
  };
  
  watchContext(asTabsContext, (context, keys) => {
    if (keys.includes('tabValue')) _handleContextChange(context);
  });
  useMounted(() => {
    const { value } = getProps();
    const context = getContext(asTabsContext);
    const insertIndex = element.getListIndex(context.tabRefs);
    context.tabRefs.splice(insertIndex, 0, element.get());
    context.tabs.splice(insertIndex, 0, value);
    _handleContextChange(context);
  });
  useUnmounted(() => {
    const context = getContext(asTabsContext);
    const removeIndex = element.getListIndex(context.tabRefs);
    context.tabs.splice(removeIndex, 1);
    context.tabRefs.splice(removeIndex, 1);
  });
  // event
  event.on('click', () => {
    const { value } = getProps();
    const context = getContext(asTabsContext);
    context.changeTab(value);
  });
  event.on('keydown', (e) => {
    const event = e as KeyboardEvent;
    const context = getContext(asTabsContext);
    const { value } = getProps();
    const currentIndex = context.tabs.indexOf(value);
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
