import { definePrototype, WebComponentAdapter } from '@/core';
import { asTabs } from '@/core/behaviors/as-tabs';
import { CONFIG } from '../_config';
export const ShadcnTabsPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-tabs`,
  setup: asTabs,
});

export const ShadcnTabs = WebComponentAdapter(ShadcnTabsPrototype);
