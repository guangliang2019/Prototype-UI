import { Prototype } from '../interface';
import { useConnect, useDisconnect } from '../lifecycle';

const useEventListener = <K extends keyof DocumentEventMap>(
  p: Prototype,
  key: K,
  callback: EventListener | EventListenerObject
) => {
  useConnect(p, () => {
    p.componentRef.addEventListener(key, callback);
  });
  useDisconnect(p, () => {
    p.componentRef.removeEventListener(key, callback);
  });
};

export const useHover = (
  p: Prototype,
  handleHoverChange: (hover: boolean, e: MouseEvent) => void
) => {
  useEventListener(p, 'mouseenter', (e) => handleHoverChange(true, e as MouseEvent));
  useEventListener(p, 'mouseleave', (e) => handleHoverChange(false, e as MouseEvent));
};

export const useFocus = (
  p: Prototype,
  handleFocusChange: (hover: boolean, e: FocusEvent) => void
) => {
  useEventListener(p, 'focus', (e) => handleFocusChange(true, e as FocusEvent));
  useEventListener(p, 'blur', (e) => handleFocusChange(false, e as FocusEvent));
};

export default useEventListener;
