import { PrototypeHooks } from '@/next-core/interface';
import { OverlayProps } from './interface';

const asOverlay = (hooks: PrototypeHooks<OverlayProps>) => {
  const { defineProps, getProps, useState, event, element } = hooks;

  // props
  defineProps({
    visible: false,
    onVisibleChange: () => {},
    clickOutsideInterceptor: () => true,
  });

  // state
  const visible = useState<boolean>(false, 'data-visible');

  // actions
  const show = () => {
    const props = getProps();
    visible.set(true);
    props.onVisibleChange?.(true);
  };

  const hide = () => {
    const props = getProps();
    visible.set(false);
    props.onVisibleChange?.(false);
  };

  // event: when click outside, hide the overlay
  event.onGlobal('click', (e: MouseEvent) => {
    if (!visible.value) return;
    const target = e.target as HTMLElement;
    if (!target) return;
    if (target?.contains(element.get())) {
      const props = getProps();
      // if the click outside is intercepted, do not hide
      if (!props.clickOutsideInterceptor?.(e)) return;
      hide();
    }
  });

  return {
    states: {
      visible,
    },
    actions: {
      show,
      hide,
    },
  };
};

export default asOverlay;
