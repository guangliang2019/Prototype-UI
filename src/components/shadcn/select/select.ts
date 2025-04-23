import { asSelect } from '@/core/behaviors/as-select';
import { CONFIG } from '../_config';
import { ShadcnSelectContext, ShadcnSelectContextType, ShadcnSelectProps } from './interface';
import { definePrototype, WebComponentAdapter } from '@/core';

export const ShadcnSelectPrototype = definePrototype<ShadcnSelectProps>({
  name: `${CONFIG.shadcn.prefix}-select`,
  setup: (p) => {
    asSelect(p);

    p.context.provide(ShadcnSelectContext, (updateContext) => {
      const context: ShadcnSelectContextType = {
        // arrowRef: p.view.createElement('shadcn-select-arrow'),
        // checkRef: p.view.createElement('shadcn-select-check'),
        // valueRef: p.view.createElement('shadcn-select-value'),
        arrowRef: document.createElement('shadcn-select-arrow'),
        checkRef: document.createElement('shadcn-select-check'),
        valueRef: document.createElement('shadcn-select-value'),
        updateRef: (name, ref) => {
          const originalRef = context[name];
          updateContext({
            [name]: ref,
          });
          if (originalRef) originalRef.remove();
        },
      };
      return context;
    });

    return () => {
      const _class = p.view.getElement().className;
      const _computedClass = 'block relative';
      p.view.getElement().className = [_computedClass, _class].join(' ').trimEnd();
    };
  },
});

export const ShadcnSelect = WebComponentAdapter(ShadcnSelectPrototype);
