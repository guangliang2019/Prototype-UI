import { definePrototype, WebComponentAdapter } from '@/core';
import asTabs from '@/core/behaviors/as-tabs/as-tabs';
import { TabsExposes, TabsProps } from '@/core/behaviors/as-tabs/interface';

const PrototypeTestTab = WebComponentAdapter<TabsProps, TabsExposes>(
  definePrototype({
    name: 'prototype-test-tab',
    setup: (p) => {
      asTabs(p);
    },
  })
);

export default PrototypeTestTab;
