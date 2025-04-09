import { definePrototype, WebComponentAdapter } from '@/core';
import asTabs from '@/core/behaviors/as-tabs/as-tabs';
import { TabsProps } from '@/core/behaviors/as-tabs/interface';

const PrototypeTestTab = WebComponentAdapter<TabsProps>(
  definePrototype({
    name: 'prototype-test-tab',
    setup: (p) => {
      asTabs(p);
    },
  })
);

export default PrototypeTestTab;
