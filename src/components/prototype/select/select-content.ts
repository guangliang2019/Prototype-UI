import { PrototypeSelectContext } from './interface';
import { definePrototype, getContext, useConnect } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { watchContext } from '@/core/context';
import { asOverlay } from '@/core/hooks/as-overlay';

const SelectContent = definePrototype((p) => {
  // context
  watchContext(p, 'prototype-select');

  asOverlay(p, (visible) => {
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
    const component = p.componentRef;
    switch (visible) {
      case true:
        if (context.selecting) return;
        context.rootRef.setAttribute('data-state', 'open');
        context.selecting = true;
        component.style.width = context.width + 'px';
        break;
      case false:
        if (!context.selecting) return;
        context.rootRef.setAttribute('data-state', 'close');
        context.triggerRef.focus();
        context.selecting = false;
        break;
    }
  });
  useConnect(p, () => {
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
    const component = p.componentRef;

    context.open = component.show
    context.close = component.hide
  });
});

const PrototypeSelectContent = WebComponentAdapter(SelectContent);

export default PrototypeSelectContent;

customElements.define('prototype-select-content', PrototypeSelectContent);
