import { definePrototype, WebComponentAdapter } from '@/core';
import { TabsContext } from '@/core/behaviors/as-tabs';
import { CONFIG } from '../_config';
export const ShadcnTabsListPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-tabs-list`,
  setup: (p) => {
    p.context.watch(TabsContext);

    // get original class
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return {
      render: () => {
        const _computedClass =
          'h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2';
        p.view.getElement().className = [_computedClass, _originalCls].join(' ').trimEnd();
      },
    };
  },
});

export const ShadcnTabsList = WebComponentAdapter(ShadcnTabsListPrototype);
