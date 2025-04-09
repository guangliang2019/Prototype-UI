import { definePrototype, WebComponentAdapter } from '@/core';

import { TabsContentProps } from '@/core/behaviors/as-tabs/interface';
import asTabsContent from '@/core/behaviors/as-tabs/as-tabs-content';

const PrototypeTestTabContent = WebComponentAdapter<TabsContentProps>(
  definePrototype({
    name: 'prototype-test-tab-content',
    setup: (p) => {
      asTabsContent(p);
    },
  })
);

export default PrototypeTestTabContent;