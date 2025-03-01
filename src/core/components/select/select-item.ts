import { SelectContext, SelectItemProps } from './interface';
import { getContext } from '@/core';
import { defineProps, useAttributeState, useConnect, useDisconnect } from '@/core/lifecycle';
import { watchContext } from '@/core/context';
import { binarySearch } from '@/core/utils/search';
import { compareDOM } from '@/core/utils/dom';
import useEventListener from '@/core/hooks/use-event-listener';
import { asButton } from '@/core/components/button';
import { Prototype } from '@/core/interface';

const asSelectItem = (p: Prototype<SelectItemProps>) => {
  // role
  asButton(p);

  // props
  defineProps(p, { value: ' ' });

  // state
  const selected = useAttributeState<boolean>(p, 'selected', false);

  // context
  watchContext(p, 'select', (context: SelectContext, keys) => {
    if (p.componentRef.value === context.value) selected.value = true;
    else selected.value = false;
  });
  useConnect(p, () => {
    const component = p.componentRef;
    const context = getContext<SelectContext>(p, 'select');
    const insertIndex = binarySearch(context.itemsRefs, component, compareDOM);
    context.itemsRefs.splice(insertIndex, 0, component);
    context.items.splice(insertIndex, 0, component.value);
  });
  useDisconnect(p, () => {
    const component = p.componentRef;
    const context = getContext<SelectContext>(p, 'select');
    const removeIndex = binarySearch(context.itemsRefs, component, compareDOM);
    context.items.splice(removeIndex, 1);
    context.itemsRefs.splice(removeIndex, 1);
  });

  // events
  const _handleSelectItemMouseEnter = () => p.componentRef.focus();
  const _handleSelectItemMouseLeave = () => p.componentRef.blur();

  const _handleKeydown = (event: KeyboardEvent) => {
    const context = getContext<SelectContext>(p, 'select');
    const component = p.componentRef;
    const currentIndex = context.itemsRefs.indexOf(component);
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
      context.changeValue(component.value, true);
    }

    if (event.key === 'Tab') {
      context.close();
    }
  };

  useEventListener(p, 'mouseenter', _handleSelectItemMouseEnter);
  useEventListener(p, 'mouseleave', _handleSelectItemMouseLeave);
  useEventListener(p, 'keydown', _handleKeydown as EventListener);
  useConnect(p, () => {
    const component = p.componentRef;
    const context = getContext<SelectContext>(p, 'select');
    component.onClick = () => {
      context.changeValue(component.value, true);
    };
  });
};

export default asSelectItem;
