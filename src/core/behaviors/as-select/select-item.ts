import { PrototypeAPI } from '@/core/interface';
import { DEFAULT_SELECT_ITEM_PROPS, SelectContext, SelectItemExposes, SelectItemProps } from './interface';
import { asButton } from '../as-button';

const asSelectItem = <
  Props extends SelectItemProps = SelectItemProps,
  Exposes extends SelectItemExposes = SelectItemExposes,
>(
  p: PrototypeAPI<Props, Exposes>
) => {
  // role
  asButton(p);

  // props
  p.props.define(DEFAULT_SELECT_ITEM_PROPS as Props);

  // state
  const selected = p.state.define<boolean>(false, 'data-selected');

  // context
  p.context.watch(SelectContext, (context, _) => {
    const props = p.props.get();
    if (props.value === context.value) selected.set(true);
    else selected.set(false);
  });
  p.lifecycle.onMounted(() => {
    const props = p.props.get();
    const context = p.context.get(SelectContext);
    const insertIndex = p.view.insertElement(context.itemsRefs);
    context.items.splice(insertIndex, 0, props.value);
  });
  p.lifecycle.onBeforeUnmount(() => {
    const props = p.props.get();
    const context = p.context.get(SelectContext);
    const removeIndex = context.items.indexOf(props.value);
    context.items.splice(removeIndex, 1);
  });

  // events
  const _handleSelectItemMouseEnter = () => p.view.getElement().focus();
  const _handleSelectItemMouseLeave = () => p.view.getElement().blur();

  const _handleKeydown = (event: KeyboardEvent) => {
    const context = p.context.get(SelectContext);
    const props = p.props.get();
    const currentIndex = context.itemsRefs.indexOf(p.view.getElement());
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

  p.event.on('mouseenter', _handleSelectItemMouseEnter);
  p.event.on('mouseleave', _handleSelectItemMouseLeave);
  p.event.on('keydown', _handleKeydown);
  p.lifecycle.onMounted(() => {
    const props = p.props.get();
    const context = p.context.get(SelectContext);
    p.props.set({
      onClick: () => {
        context.changeValue(props.value, true);
      },
    } as Partial<Props>);
  });
};

export default asSelectItem;
