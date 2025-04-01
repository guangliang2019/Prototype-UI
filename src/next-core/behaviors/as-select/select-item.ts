import { PrototypeHooks } from '@/next-core/interface';
import { SelectContext, SelectContextType, SelectItemProps } from './interface';
import { asButton } from '../as-button';

const asSelectItem = (hooks: PrototypeHooks<SelectItemProps>) => {
  const {
    defineProps,
    getProps,
    useState,
    watchContext,
    useMounted,
    useUnmounted,
    getContext,
    element,
    event,
  } = hooks;
  // role
  asButton(hooks);

  // props
  defineProps({ value: ' ' });

  // state
  const selected = useState<boolean>(false, 'data-selected');

  // context
  watchContext(SelectContext, (context: SelectContextType, _) => {
    const props = getProps();
    if (props.value === context.value) selected.set(true);
    else selected.set(false);
  });
  useMounted(() => {
    const props = getProps();
    const context = getContext(SelectContext);
    const insertIndex = element.insert(context.itemsRefs);
    context.items.splice(insertIndex, 0, props.value);
  });
  useUnmounted(() => {
    const props = getProps();
    const context = getContext(SelectContext);
    const removeIndex = context.items.indexOf(props.value);
    context.items.splice(removeIndex, 1);
  });

  // events
  const _handleSelectItemMouseEnter = () => element.get().focus();
  const _handleSelectItemMouseLeave = () => element.get().blur();

  const _handleKeydown = (event: KeyboardEvent) => {
    const context = getContext(SelectContext);
    const props = getProps();
    const currentIndex = context.itemsRefs.indexOf(element.get());
    const nextIndex = (currentIndex + 1) % context.items.length;
    const prevIndex = (currentIndex - 1 + context.items.length) % context.items.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      context.itemsRefs[nextIndex].focus();
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      context.itemsRefs[prevIndex].focus();
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      context.changeValue(props.value, true);
    }

    if (event.key === 'Tab') {
      context.close();
    }
  };

  event.on('mouseenter', _handleSelectItemMouseEnter);
  event.on('mouseleave', _handleSelectItemMouseLeave);
  event.on('keydown', _handleKeydown);
  useMounted(() => {
    const props = getProps();
    const context = getContext(SelectContext);
    props.onClick = () => {
      context.changeValue(props.value, true);
    };
  });
};

export default asSelectItem;
