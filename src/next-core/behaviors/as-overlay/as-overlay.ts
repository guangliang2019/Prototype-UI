import { PrototypeAPI } from '@/next-core/interface';
import { OverlayProps } from './interface';

const asOverlay = (p: PrototypeAPI<OverlayProps>) => {
  // props
  p.props.define({
    visible: false,
    onVisibleChange: () => {},
    clickOutsideInterceptor: () => true,
  });

  // state
  const visible = p.state.define<boolean>(false, 'data-visible');

  // actions
  const show = () => {
    const props = p.props.get();
    visible.set(true);
    props.onVisibleChange?.(true);
  };

  const hide = () => {
    const props = p.props.get();
    visible.set(false);
    props.onVisibleChange?.(false);
  };

  // event: when click outside, hide the overlay
  p.event.onGlobal('click', (e: MouseEvent) => {
    if (!visible.value) return;
    const target = e.target as HTMLElement;
    if (!target) return;
    if (target?.contains(p.view.getElement())) {
      const props = p.props.get();
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
