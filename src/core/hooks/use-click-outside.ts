import { GlobalEvent } from '@/components/common/global-event';
import { useConnect, useDisconnect } from '../lifecycle';
import { Prototype } from '../interface';

const useClickOutside = <T extends Record<string | symbol, any>>(
  self: Prototype<T>,
  callback: (e: MouseEvent) => void
) => {
  const _handleClickOutside = (event: MouseEvent) => {
    if (!self.componentRef.contains(event.target as Node)) {
      callback(event);
    }
  };
  useConnect(self, () => {
    GlobalEvent.addListener('mousedown', _handleClickOutside as EventListener);
  });
  useDisconnect(self, () => {
    GlobalEvent.removeListener('mousedown', _handleClickOutside as EventListener);
  });
};

export default useClickOutside;
