import './style.css';
import { definePrototype, WebComponentAdapter } from '@/core';
import {
  asTabs,
  asTabsContent,
  asTabsIndicator,
  asTabsTrigger,
  TabsContentProps,
} from '@/core/behaviors/as-tabs';

export const PrototypeTabs = WebComponentAdapter(
  definePrototype({
    name: 'prototype-tabs',
    setup: asTabs,
  })
);
export const PrototypeTabsTrigger = WebComponentAdapter(
  definePrototype({
    name: 'prototype-tabs-trigger',
    setup: asTabsTrigger,
  })
);
export const PrototypeTabsContent = WebComponentAdapter<TabsContentProps>({
  name: 'prototype-tabs-content',
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
  name: 'prototype-tabs-indicator',
  setup: asTabsIndicator,
});
