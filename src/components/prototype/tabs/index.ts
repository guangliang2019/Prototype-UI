import './style.css';
import { definePrototype, PrototypeAPI, WebComponentAdapter } from '@/next-core';
import {
  asTabs,
  asTabsContent,
  asTabsIndicator,
  asTabsTrigger,
  TabsContentProps,
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
export const PrototypeTabsContent = WebComponentAdapter<TabsContentProps>({
  displayName: 'prototype-tabs-content',
  setup: (p) => {
    // role
    asTabsContent(p);

    // get original class name
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    // set hidden style
    return {
      render: () => {
        p.view.getElement().className = [_originalCls, 'data-[state=inactive]:hidden']
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
