import { PrototypeAPI } from '@/next-core/interface';
import { TabsContext, TabsContextType, TabsTriggerProps } from './interface';

const asTabsTrigger = (p: PrototypeAPI<TabsTriggerProps>) => {
  // role
  p.role.asTrigger();

  // props
  p.props.define({ value: '' });

  // ui-state
  const state = p.state.define<'active' | 'inactive'>('inactive', 'data-state');

  // context
  const _handleContextChange = (context: TabsContextType) => {
    const { value } = p.props.get();
    if (context.tabValue === value) {
      p.event.focus.setPriority(0);
      state.set('active');
      if (context.index === -1) context.index = context.tabs.indexOf(value);
    } else {
      p.event.focus.setPriority(-1);
      state.set('inactive');
    }
  };
  p.context.watch(TabsContext, (context, keys) => {
    if (keys.includes('tabValue')) _handleContextChange(context);
  });

  // deal with insert index
  p.lifecycle.onMounted(() => {
    const { value } = p.props.get();
    const context = p.context.get(TabsContext);
    const insertIndex = p.view.insertElement(context.tabRefs);
    context.tabs.splice(insertIndex, 0, value);
    _handleContextChange(context);
    if (context.index === -1) context.index = insertIndex;
  });
  p.lifecycle.onBeforeUnmount(() => {
    const context = p.context.get(TabsContext);
    const removeIndex = context.tabRefs.indexOf(p.view.getElement());
    context.tabs.splice(removeIndex, 1);
    context.tabRefs.splice(removeIndex, 1);
  });

  // event
  p.event.on('click', () => {
    const { value } = p.props.get();
    const context = p.context.get(TabsContext);
    context.changeTab(value);
  });
  p.event.on('keydown', (e) => {
    const event = e as KeyboardEvent;
    const context = p.context.get(TabsContext);
    const { value } = p.props.get();
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
