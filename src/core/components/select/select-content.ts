import { SelectContext, SelectContentProps } from './interface';
import { getContext, useConnect } from '@/core';
import { asOverlay } from '@/core/components/overlay';
import { watchContext } from '@/core/context';
import { Prototype } from '@/core/interface';

const asSelectContent = (p: Prototype<SelectContentProps>) => {
  // context
  watchContext(p, 'select');

  // role
  asOverlay(p, {
    handleVisibleChange: (visible) => {
      const context = getContext<SelectContext>(p, 'select');
      const component = p.componentRef;
      switch (visible) {
        case true:
          if (context.selecting.value) return;
          context.selecting.value = true;
          component.style.width = context.width + 'px';
          break;
        case false:
          if (!context.selecting.value) return;
          context.triggerRef.focus();
          context.selecting.value = false;
          break;
      }
    },
    handleClickOutside: (e) => {
      const context = getContext<SelectContext>(p, 'select');
      return e.target === context.triggerRef;
    },
  });
  useConnect(p, () => {
    const context = getContext<SelectContext>(p, 'select');
    const component = p.componentRef;

    context.open = component.show;
    context.close = component.hide;
  });
};

export default asSelectContent;
