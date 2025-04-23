import { definePrototype, WebComponentAdapter } from '@/core';
import { asTabsContent, TabsContentProps } from '@/core/behaviors/as-tabs';
import { CONFIG } from '../_config';
export const ShadcnTabsContentPrototype = definePrototype<TabsContentProps>({
  name: `${CONFIG.shadcn.prefix}-tabs-content`,
  setup: (p) => {
    asTabsContent(p);

    // get original class
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return () => {
      p.view.getElement().className = [_originalCls, 'data-[state=inactive]:hidden']
        .join(' ')
        .trimEnd();
    };
  },
});

export const ShadcnTabsContent = WebComponentAdapter(ShadcnTabsContentPrototype);
