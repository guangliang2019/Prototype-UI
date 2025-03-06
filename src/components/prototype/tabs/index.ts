import { definePrototype, useConnect } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import {
  asTabs,
  asTabsContent,
  asTabsIndicator,
  asTabsTrigger,
  TabsContentProps,
} from '@/core/components/tabs';
import './style.css';

const TabsContent = definePrototype<TabsContentProps>((p) => {
  asTabsContent(p);

  let _originalCls = '';
  useConnect(p, () => {
    _originalCls = p.componentRef.className;
  });

  return () => {
    const component = p.componentRef;
    component.className = [_originalCls, 'data-[state=inactive]:hidden'].join(' ').trimEnd();

    return null;
  };
});

export const PrototypeTabs = WebComponentAdapter(definePrototype(asTabs));
export const PrototypeTabsTrigger = WebComponentAdapter(definePrototype(asTabsTrigger));
export const PrototypeTabsContent = WebComponentAdapter(TabsContent);
export const PrototypeTabsIndicator = WebComponentAdapter(definePrototype(asTabsIndicator));

customElements.define('prototype-tabs', PrototypeTabs);
customElements.define('prototype-tabs-trigger', PrototypeTabsTrigger);
customElements.define('prototype-tabs-content', PrototypeTabsContent);
customElements.define('prototype-tabs-indicator', PrototypeTabsIndicator);
