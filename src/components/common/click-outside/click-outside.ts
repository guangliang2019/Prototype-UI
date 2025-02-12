/**
 * Click Outside Component
 *
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/click-outside/click-outside.ts
 * @author guangliang2019
 * @date 2024-08-11
 */

import useClickOutside from '@/core/hooks/use-click-outside';
import { definePrototype, useCreated } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';

interface ClickOutsideProps {
  onClickOutside: (event: MouseEvent) => void;
}

const DEFAULT_CLICK_OUTSIDE_PROPS = {
  onClickOutside: (_: MouseEvent) => {},
};

const ClickOutside = definePrototype<ClickOutsideProps>((self) => {
  useCreated(self, () => {
    self.componentRef.onClickOutside = DEFAULT_CLICK_OUTSIDE_PROPS['onClickOutside'];
  });
  useClickOutside(self, (e) => self.onClickOutside(e));
});

export default ClickOutside;

customElements.define('click-outside', WebComponentAdapter(ClickOutside));
