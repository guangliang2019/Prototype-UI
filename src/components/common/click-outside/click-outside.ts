/**
 * Click Outside Component
 *
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/click-outside/click-outside.ts
 * @author guangliang2019
 * @date 2024-08-11
 */

import { GlobalEvent } from '../global-event';
import { defineComponent, useConnect, useCreated, useDisconnect } from '@/core';

interface ClickOutsideProps {
  onClickOutside: (event: MouseEvent) => void;
}

const DEFAULT_CLICK_OUTSIDE_PROPS = {
  onClickOutside: (_: MouseEvent) => {},
};

const ClickOutside = defineComponent<ClickOutsideProps>((self) => {
  const _handleClickOutside = (event: MouseEvent) => {
    if (!self.contains(event.target as Node)) {
      self.onClickOutside(event);
    }
  };

  useCreated(self, () => {
    self.onClickOutside = DEFAULT_CLICK_OUTSIDE_PROPS['onClickOutside'];
  });
  useConnect(self, () => {
    GlobalEvent.addListener('mousedown', _handleClickOutside as EventListener);
  });
  useDisconnect(self, () => {
    GlobalEvent.removeListener('mousedown', _handleClickOutside as EventListener);
  });
});

export default ClickOutside;

customElements.define('click-outside', ClickOutside);
