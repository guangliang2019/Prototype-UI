import { ShadcnSelectContext } from './interface';
import { definePrototype, RendererAPI, WebComponentAdapter } from '@/core';
import { SelectContext } from '@/core/behaviors/as-select';
import { CONFIG } from '../_config';

export const ShadcnSelectArrowPrototype = definePrototype<{}>({
  name: `${CONFIG.shadcn.prefix}-select-arrow`,
  setup: (p) => {
    p.context.watch(SelectContext);
    p.context.watch(ShadcnSelectContext);

    p.lifecycle.onMounted(() => {
      const { updateRef, arrowRef } = p.context.get(ShadcnSelectContext);
      const element = p.view.getElement();
      if (arrowRef !== element) updateRef('arrowRef', element);
      element.className = 'w-4 h-4 opacity-50';
    });

    return (renderer: RendererAPI) => {
      const h = renderer.createElement;
      const element = h(
        'svg',
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          class: 'shadcn-icon shadcn-select-arrow',
        },
        [
          h('path', {
            d: 'M8.5 15L12 18.5L15.5 15',
            strokeWidth: '1.5',
          }),
          h('path', {
            d: 'M8.5 9L12 5.5L15.5 9',
            strokeWidth: '1.5',
          }),
        ]
      );
      return element;
    };
  },
});

export const ShadcnSelectArrow = WebComponentAdapter(ShadcnSelectArrowPrototype);
