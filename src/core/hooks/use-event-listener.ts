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

export const useHover = (p: Prototype, onMouseEnter: () => void, onMouseLeave: () => void) => {
  useEventListener(p, 'mouseenter', onMouseEnter);
  useEventListener(p, 'mouseleave', onMouseLeave);
};

export const useFocus = (p: Prototype, onFocus: () => void, onBlur: () => void) => {
  useEventListener(p, 'focus', onFocus);
  useEventListener(p, 'blur', onBlur);
};

export default useEventListener;
