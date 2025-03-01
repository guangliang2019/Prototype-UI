import { useConnect } from '@/core';
import { SelectContext } from './interface';
import { getContext, watchContext } from '@/core/context';
import useEventListener from '@/core/hooks/use-event-listener';
import { asTrigger } from '@/core/components/trigger';
import { Prototype } from '@/core/interface';

const asSelectTrigger = (p: Prototype) => {
  // role
  asTrigger(p);
  // context
  watchContext(p, 'select');
  useConnect(p, () => {
    const context = getContext<SelectContext>(p, 'select');
    const component = p.componentRef;
    context.width = component.offsetWidth;
    context.triggerRef = component;
    context.focus = component.focus;
  });

  const _handleMouseDown = (event: MouseEvent): void => {
    const context = getContext<SelectContext>(p, 'select');
    const component = p.componentRef;
    // context.width = component.offsetWidth;

    // Check if the click is on the trigger or its children
    if (event.target instanceof Node && component.contains(event.target)) {
      if (document.activeElement === component) {
        context.selecting.value ? context.close() : context.open();
        _focusSelectedItem(context);
      }
    } else if (context.selecting.value) {
      // If the click is outside and the select is open, close it
      context.close();
    }
  };

  const _focusSelectedItem = (context: SelectContext): void => {
    const index = context.items.indexOf(context.value);
    if (index !== -1 && Array.isArray(context.itemsRefs) && context.itemsRefs.length > index) {
      requestAnimationFrame(() => {
        const itemToFocus = context.itemsRefs[index];
        if (itemToFocus && typeof itemToFocus.focus === 'function') {
          itemToFocus.focus();
        } else {
          console.warn(
            `Failed to focus item at index ${index}. Item may not be properly initialized.`
          );
        }
      });
    } else {
      // -1 index appears when no item is selected, add this message for better debugging
      console.debug(`Invalid index ${index} or itemsRefs not properly initialized.`);
    }
  };

  const _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      _handleFocus();
    }
  };

  const _handleFocus = (): void => {
    const context = getContext<SelectContext>(p, 'select');
    const component = p.componentRef;
    context.width = component.offsetWidth;
    context.selecting.value ? context.close() : context.open();
    _focusSelectedItem(context);
  };

  useEventListener(p, 'focus', _handleFocus);
  useEventListener(p, 'mousedown', _handleMouseDown as EventListener);
  useEventListener(p, 'keydown', _handleKeydown as EventListener);
};

export default asSelectTrigger;
