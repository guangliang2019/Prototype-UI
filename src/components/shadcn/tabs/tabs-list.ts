import { definePrototype, WebComponentAdapter } from '@/next-core';
import { TabsContext } from '@/next-core/behaviors/as-tabs';

export const ShadcnTabsListPrototype = definePrototype({
  setup: (hooks) => {
    const { useMounted, element, watchContext } = hooks;

    watchContext(TabsContext);

    // get original class
    let _originalCls = '';
    useMounted(() => {
      _originalCls = element.get().className;
    });

    return {
      render: () => {
        const _computedClass =
          'h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2';
        element.get().className = [_computedClass, _originalCls].join(' ').trimEnd();
      },
    };
  },
});

export const ShadcnTabsList = WebComponentAdapter(ShadcnTabsListPrototype);

customElements.define('shadcn-tabs-list', ShadcnTabsList);
