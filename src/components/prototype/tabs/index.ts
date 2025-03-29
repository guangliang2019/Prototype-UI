import './style.css';
import { definePrototype, WebComponentAdapter } from '@/next-core';
import {
  asTabs,
  asTabsContent,
  asTabsIndicator,
  asTabsTrigger,
} from '@/next-core/behaviors/as-tabs';

export const PrototypeTabs = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-tabs',
    setup: asTabs,
  })
);
export const PrototypeTabsTrigger = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-tabs-trigger',
    setup: asTabsTrigger,
  })
);
export const PrototypeTabsContent = WebComponentAdapter({
  displayName: 'prototype-tabs-content',
  setup: (hooks) => {
    const { useMounted, element } = hooks;
    // role
    asTabsContent(hooks);

    // get original class name
    let _originalCls = '';
    useMounted(() => {
      _originalCls = element.get().className;
    });

    // set hidden style
    return {
      render: () => {
        element.get().className = [_originalCls, 'data-[state=inactive]:hidden']
          .join(' ')
          .trimEnd();
      },
    };
  },
});
export const PrototypeTabsIndicator = WebComponentAdapter({
  displayName: 'prototype-tabs-indicator',
  setup: asTabsIndicator,
});

customElements.define('prototype-tabs', PrototypeTabs);
customElements.define('prototype-tabs-trigger', PrototypeTabsTrigger);
customElements.define('prototype-tabs-content', PrototypeTabsContent);
customElements.define('prototype-tabs-indicator', PrototypeTabsIndicator);
