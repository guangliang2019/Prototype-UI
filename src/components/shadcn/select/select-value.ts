import { ShadcnSelectContext, ShadcnSelectValueProps } from './interface';
import { definePrototype, WebComponentAdapter } from '@/next-core';
import { asSelectValue } from '@/next-core/behaviors/as-select';
import { CONFIG } from '../_config';

export const ShadcnSelectValuePrototype = definePrototype<ShadcnSelectValueProps>({
  displayName: 'shadcn-select-value',
  setup: (p) => {
    asSelectValue(p);

    p.context.watch(ShadcnSelectContext);

    p.lifecycle.onMounted(() => {
      const { updateRef } = p.context.get(ShadcnSelectContext);
      updateRef('valueRef', p.view.getElement());
    });

    return {};
  },
});

export const ShadcnSelectValue = WebComponentAdapter(ShadcnSelectValuePrototype);

customElements.define(`${CONFIG.shadcn.prefix}-select-value`, ShadcnSelectValue);
