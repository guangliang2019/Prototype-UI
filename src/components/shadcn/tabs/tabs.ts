import { definePrototype } from '@/core';
import { asTabs, TabsProps } from '@/core/components/tabs';
import { WebComponentAdapter } from '@/core/adapter/web-component';

const Tabs = definePrototype<TabsProps>((p) => {
  asTabs(p);
});

const ShadcnTabs = WebComponentAdapter(Tabs);

export default ShadcnTabs;

customElements.define('shadcn-tabs', ShadcnTabs);
