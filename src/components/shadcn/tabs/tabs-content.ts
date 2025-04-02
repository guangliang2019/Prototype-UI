import { definePrototype, WebComponentAdapter } from '@/next-core';
import { asTabsContent, TabsContentProps } from '@/next-core/behaviors/as-tabs';

export const ShadcnTabsContentPrototype = definePrototype<TabsContentProps>({
  setup: (p) => {
    asTabsContent(p);

    // get original class
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return {
      render: () => {
        p.view.getElement().className = [_originalCls, 'data-[state=inactive]:hidden']
          .join(' ')
          .trimEnd();
      },
    };
  },
});

export const ShadcnTabsContent = WebComponentAdapter(ShadcnTabsContentPrototype);

customElements.define('shadcn-tabs-content', ShadcnTabsContent);
