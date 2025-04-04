import { PrototypeAPI } from '@/next-core/interface';
import { SelectContext, SelectContextType, SelectTriggerProps } from './interface';
import { asButton } from '../as-button';

const asSelectTrigger = (p: PrototypeAPI<SelectTriggerProps>) => {
  // role
  const { actions: ButtonActions } = asButton(p);
  // context
  p.context.watch(SelectContext, (context, keys) => {
    if (keys.includes('width')) {
      context.width = context.valueRef.offsetWidth;
    }
  });
  p.lifecycle.onMounted(() => {
    const context = p.context.get(SelectContext);
    const component = p.view.getElement();
    context.width = component.offsetWidth;
    context.triggerRef = component;
    context.focus = ButtonActions.focus;
  });

  const _handleMouseDown = (event: MouseEvent): void => {
    const context = p.context.get(SelectContext);
    const component = p.view.getElement();
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

  const _focusSelectedItem = (context: SelectContextType): void => {
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
    const context = p.context.get(SelectContext);
    const component = p.view.getElement();
    context.width = component.offsetWidth;
    context.selecting.value ? context.close() : context.open();
    _focusSelectedItem(context);
  };

  p.event.on('focus', _handleFocus);
  p.event.on('mousedown', _handleMouseDown as EventListener);
  p.event.on('keydown', _handleKeydown as EventListener);
};

export default asSelectTrigger;
