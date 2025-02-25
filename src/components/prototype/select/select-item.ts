import { PrototypeSelectContext, SelectItemProps } from './interface';
import { definePrototype, getContext } from '@/core';
import { asButton } from '../button/button';
import { defineProps, useAttributeState, useConnect, useDisconnect } from '@/core/lifecycle';
import { watchContext } from '@/core/context';
import { binarySearch } from '@/core/utils/search';
import { compareDOM } from '@/core/utils/dom';
import useEventListener from '@/core/hooks/use-event-listener';
import { WebComponentAdapter } from '@/core/adapter/web-component';

const SelectItem = definePrototype<SelectItemProps>((p) => {
  // role
  asButton(p);

  // props
  defineProps(p, { value: ' ' });

  // state
  const selected = useAttributeState<boolean>(p, 'selected', false);

  // context
  watchContext(p, 'prototype-select', (context: PrototypeSelectContext) => {
    if (p.componentRef.value === context.value) selected.value = true;
    else selected.value = false;
  });
  useConnect(p, () => {
    const component = p.componentRef;
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
    const insertIndex = binarySearch(context.itemsRefs, component, compareDOM);
    context.itemsRefs.splice(insertIndex, 0, component);
    context.items.splice(insertIndex, 0, component.value);
  });
  useDisconnect(p, () => {
    const component = p.componentRef;
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
    const removeIndex = binarySearch(context.itemsRefs, component, compareDOM);
    context.items.splice(removeIndex, 1);
    context.itemsRefs.splice(removeIndex, 1);
  });

  // events
  const _handleSelectItemMouseEnter = () => p.componentRef.focus();
  const _handleSelectItemMouseLeave = () => p.componentRef.blur();

  const _handleKeydown = (event: KeyboardEvent) => {
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
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
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
    component.onClick = () => {
      context.changeValue(component.value, true);
    };
  });
});

const PrototypeSelectItem = WebComponentAdapter(SelectItem);

export default PrototypeSelectItem;

customElements.define('prototype-select-item', PrototypeSelectItem);
