import { ShadcnSelectContext, ShadcnSelectValueProps } from './interface';
import { definePrototype, WebComponentAdapter } from '@/core';
import { asSelectValue } from '@/core/behaviors/as-select';
import { CONFIG } from '../_config';
import { SelectValueExposes } from '@/core/behaviors/as-select/interface';

export const ShadcnSelectValuePrototype = definePrototype<
  ShadcnSelectValueProps,
  SelectValueExposes
>({
  name: `${CONFIG.shadcn.prefix}-select-value`,
  setup: (p) => {
    const { render: renderSelectValue } = asSelectValue(p);

    p.context.watch(ShadcnSelectContext);

    p.lifecycle.onMounted(() => {
      const { updateRef, valueRef } = p.context.get(ShadcnSelectContext);
      const element = p.view.getElement();
      if (valueRef !== element) updateRef('valueRef', element);
    });

    return (renderer) => {
      renderSelectValue(renderer);
    };
  },
});

export const ShadcnSelectValue = WebComponentAdapter(ShadcnSelectValuePrototype);
