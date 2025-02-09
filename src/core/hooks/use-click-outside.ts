import { GlobalEvent } from '@/components/common/global-event';
import { useConnect, useDisconnect } from '../lifecycle';
import { Component } from '../interface';

const useClickOutside = <T>(self: Component<T>, callback: (e: MouseEvent) => void) => {
  const _handleClickOutside = (event: MouseEvent) => {
    if (!self.contains(event.target as Node)) {
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
