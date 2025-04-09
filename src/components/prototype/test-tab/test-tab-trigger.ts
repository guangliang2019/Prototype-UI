import { definePrototype, WebComponentAdapter } from '@/core';

import asTabsTrigger from '@/core/behaviors/as-tabs/as-tabs-trigger';
import { TabsTriggerProps } from '@/core/behaviors/as-tabs';

const PrototypeTestTabTrigger = WebComponentAdapter<TabsTriggerProps>(
  definePrototype({
    name: 'prototype-test-tab-trigger',
    setup: (p) => {
      asTabsTrigger(p);
    },
  })
);

export default PrototypeTestTabTrigger;
