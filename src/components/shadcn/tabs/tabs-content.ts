import { definePrototype, useConnect } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { asTabsContent, TabsContentProps } from '@/core/components/tabs';

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

const ShadcnTabsContent = WebComponentAdapter(TabsContent);

export default ShadcnTabsContent;

customElements.define('shadcn-tabs-content', ShadcnTabsContent);
