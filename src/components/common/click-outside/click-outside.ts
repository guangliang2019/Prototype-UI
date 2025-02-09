/**
 * Click Outside Component
 *
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/click-outside/click-outside.ts
 * @author guangliang2019
 * @date 2024-08-11
 */

import useClickOutside from '@/core/hooks/use-click-outside';
import { defineComponent, useCreated } from '@/core';

interface ClickOutsideProps {
  onClickOutside: (event: MouseEvent) => void;
}

const DEFAULT_CLICK_OUTSIDE_PROPS = {
  onClickOutside: (_: MouseEvent) => {},
};

const ClickOutside = defineComponent<ClickOutsideProps>((self) => {
  useCreated(self, () => {
    self.onClickOutside = DEFAULT_CLICK_OUTSIDE_PROPS['onClickOutside'];
  });
  useClickOutside(self, (e) => self.onClickOutside(e));
});

export default ClickOutside;

customElements.define('click-outside', ClickOutside);
