import './style.css';
import { definePrototype, WebComponentAdapter } from '@/core';
import {
  asTabs,
  asTabsContent,
  asTabsIndicator,
  asTabsTrigger,
  TabsContentProps,
  TabsProps,
} from '@/core/behaviors/as-tabs';
import {
  TabsContentExposes,
  TabsExposes,
  TabsIndicatorExposes,
  TabsIndicatorProps,
  TabsTriggerExposes,
  TabsTriggerProps,
} from '@/core/behaviors/as-tabs/interface';

export const PrototypeTabs = WebComponentAdapter(
  definePrototype<TabsProps, TabsExposes>({
    name: 'prototype-tabs',
    setup: (p) => {
      asTabs(p);
    },
  })
);
export const PrototypeTabsTrigger = WebComponentAdapter(
  definePrototype<TabsTriggerProps, TabsTriggerExposes>({
    name: 'prototype-tabs-trigger',
    setup: (p) => {
      asTabsTrigger(p);
    },
  })
);
export const PrototypeTabsContent = WebComponentAdapter<TabsContentProps, TabsContentExposes>({
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
    return () => {
      p.view.getElement().className = [_originalCls, 'data-[state=inactive]:hidden']
        .join(' ')
        .trimEnd();
    };
  },
});
export const PrototypeTabsIndicator = WebComponentAdapter<TabsIndicatorProps, TabsIndicatorExposes>(
  {
    name: 'prototype-tabs-indicator',
    setup: (p) => {
      asTabsIndicator(p);
    },
  }
);
