import { definePrototype, WebComponentAdapter } from '@/core';
import { asTabs } from '@/core/behaviors/as-tabs';
import { CONFIG } from '../_config';
import { TabsProps, TabsExposes } from '@/core/behaviors/as-tabs';
export const ShadcnTabsPrototype = definePrototype<TabsProps, TabsExposes>({
  name: `${CONFIG.shadcn.prefix}-tabs`,
  setup: (p) => {
    asTabs(p);
  },
});

export const ShadcnTabs = WebComponentAdapter(ShadcnTabsPrototype);
