import { definePrototype, useConnect } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { asTabsTrigger, TabsTriggerProps } from '@/core/components/tabs';

const TabsTrigger = definePrototype<TabsTriggerProps>((p) => {
  asTabsTrigger(p);
  let _originalCls = '';
  useConnect(p, () => {
    _originalCls = p.componentRef.className;
  });

  return () => {
    const component = p.componentRef;
    const _computedClass =
      'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow';
    component.className = [_computedClass, _originalCls].join(' ').trimEnd();

    return null;
  };
});

const ShadcnTabsTrigger = WebComponentAdapter(TabsTrigger);

export default ShadcnTabsTrigger;

customElements.define('shadcn-tabs-trigger', ShadcnTabsTrigger);
