/**
 * Click Outside Component
 *
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/click-outside/click-outside.ts
 * @author guangliang2019
 * @date 2024-08-11
 */

import { definePrototype } from '@/core';

interface ClickOutsideExposes {
  onClickOutside: (event: MouseEvent) => void;
}

const ClickOutside = definePrototype<{}, {}, {}, ClickOutsideExposes>({
  name: 'click-outside',
  setup: (p) => {
    const exposes: ClickOutsideExposes = {
      onClickOutside: () => {},
    };

    p.event.onGlobal('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.contains(p.view.getElement())) {
        exposes.onClickOutside(e);
      }
    });

    return {
      exposes,
    };
  },
});

export default ClickOutside;
