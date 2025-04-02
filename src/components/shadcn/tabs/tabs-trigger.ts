import { definePrototype, WebComponentAdapter } from '@/next-core';
import { asTabsTrigger, TabsTriggerProps } from '@/next-core/behaviors/as-tabs';

export const ShadcnTabsTriggerPrototype = definePrototype<TabsTriggerProps>({
  setup: (p) => {
    asTabsTrigger(p);

    // get original class
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return {
      render: () => {
        const _computedClass =
          'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow';
        p.view.getElement().className = [_computedClass, _originalCls].join(' ').trimEnd();
      },
    };
  },
});

export const ShadcnTabsTrigger = WebComponentAdapter(ShadcnTabsTriggerPrototype);

customElements.define('shadcn-tabs-trigger', ShadcnTabsTrigger);
