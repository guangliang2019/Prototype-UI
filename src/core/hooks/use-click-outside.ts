import { GlobalEvent } from '@/components/common/global-event';
import { useConnect, useDisconnect } from '../lifecycle';
import { Prototype } from '../interface';

const useClickOutside = <T extends Record<string | symbol, any>>(
  p: Prototype<T>,
  callback: (e: MouseEvent) => void
) => {
  const _handleClickOutside = (event: MouseEvent) => {
    if (!p.componentRef.contains(event.target as Node)) {
      callback(event);
    }
  };
  useConnect(p, () => {
    GlobalEvent.addListener('mousedown', _handleClickOutside as EventListener);
  });
  useDisconnect(p, () => {
    GlobalEvent.removeListener('mousedown', _handleClickOutside as EventListener);
  });
};

export default useClickOutside;
