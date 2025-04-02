import { definePrototype, WebComponentAdapter } from '@/next-core';
import { asTabs } from '@/next-core/behaviors/as-tabs';

export const ShadcnTabsPrototype = definePrototype({
  setup: asTabs,
});

export const ShadcnTabs = WebComponentAdapter(ShadcnTabsPrototype);

customElements.define('shadcn-tabs', ShadcnTabs);
