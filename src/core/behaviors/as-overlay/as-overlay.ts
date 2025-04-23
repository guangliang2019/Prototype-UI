import { PrototypeAPI } from '@/core/interface';
import { DEFAULT_OVERLAY_PROPS, OverlayExposes, OverlayProps, OverlayState } from './interface';

const asOverlay = <
  Props extends OverlayProps = OverlayProps,
  Exposes extends OverlayExposes = OverlayExposes,
>(
  p: PrototypeAPI<Props, Exposes>
): {
  states: OverlayState;
} => {
  // props
  p.props.define(DEFAULT_OVERLAY_PROPS as Props);

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
    const root = p.view.getElement();
    if (!target) return;
    if (!root.contains(target)) {
      const props = p.props.get();
      // if the click outside is intercepted, do not hide
      if (!props.clickOutsideInterceptor?.(e)) return;
      hide();
    }
  });

  p.expose.define('show', show);
  p.expose.define('hide', hide);

  return {
    states: {
      visible,
    },
  };
};

export default asOverlay;
