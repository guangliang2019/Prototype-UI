import { definePrototype, WebComponentAdapter } from '@/next-core';
import { asTabsContent, TabsContentProps } from '@/next-core/behaviors/as-tabs';

export const ShadcnTabsContentPrototype = definePrototype<TabsContentProps>({
  setup: (hooks) => {
    const { useMounted, element } = hooks;
    asTabsContent(hooks);

    // get original class
    let _originalCls = '';
    useMounted(() => {
      _originalCls = element.get().className;
    });

    return {
      render: () => {
        element.get().className = [_originalCls, 'data-[state=inactive]:hidden']
          .join(' ')
          .trimEnd();
      },
    };
  },
});

export const ShadcnTabsContent = WebComponentAdapter(ShadcnTabsContentPrototype);

customElements.define('shadcn-tabs-content', ShadcnTabsContent);
