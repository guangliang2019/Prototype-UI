import { definePrototype } from '@/core';
import { ButtonProps } from './interface';
import { defineProps, useAttributeState, useConnect } from '@/core/lifecycle';
import useEventListener, { useFocus, useHover } from '@/core/hooks/use-event-listener';
import { asTrigger } from '@/core/hooks/as-trigger';
import { WebComponentAdapter } from '@/core/adapter/web-component';

const PrototypeButton = definePrototype<ButtonProps>((p) => {
  // role
  asTrigger(p);
  // props
  defineProps(
    p,
    {
      disabled: false,
      autoFocus: false,
      onClick: () => {},
    },
    (key, value) => {
      const component = p.componentRef;
      switch (key) {
        case 'disabled':
          if (value) component.tabIndex = -1;
          else component.tabIndex = 0;
          break;
        default:
          break;
      }
    }
  );

  // ui-state
  const _hover = useAttributeState<boolean>(p, 'hover', false);
  const _focus = useAttributeState<boolean>(p, 'focus', false);
  const _focusVisible = useAttributeState<boolean>(p, 'focus-visible', false);
  const _active = useAttributeState<boolean>(p, 'active', false);
  useHover(p, (value) => (_hover.value = value));
  useFocus(p, (value) => {
    if (value) {
      if (_active.value) _focusVisible.value = true;
      _focus.value = true;
    } else {
      _focusVisible.value = false;
      _focus.value = false;
    }
  });
  useEventListener(p, 'mousedown', () => (_active.value = true));
  useEventListener(p, 'mouseup', () => (_active.value = false));

  // event
  const _handleClick = (e: MouseEvent) => {
    const component = p.componentRef;
    if (!_focus.value) return;
    if (component.disabled) return;
    component.onClick?.(e);
  };
  const _handleKeyDown = (e: KeyboardEvent) => {
    const component = p.componentRef;
    if (!_focus.value) return;
    if (component.disabled) return;
    if (e.key === 'Enter') component.onClick?.(e);
    if (e.key === ' ') component.onClick?.(e);
  };
  useEventListener(p, 'click', _handleClick as EventListener);
  useEventListener(p, 'keydown', _handleKeyDown as EventListener);

  // auto focus
  useConnect(p, () => {
    const component = p.componentRef;
    if (component.autoFocus) component.focus();
  });
});

const Button = WebComponentAdapter(PrototypeButton);

export default Button;

customElements.define('prototype-button', Button);
