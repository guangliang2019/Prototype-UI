import { ShadcnSelectContext } from './interface';
import { definePrototype, RendererAPI, WebComponentAdapter } from '@/next-core';
import { SelectContext } from '@/next-core/behaviors/as-select';
import { CONFIG } from '../_config';

export const ShadcnSelectArrowPrototype = definePrototype<{}>({
  displayName: 'shadcn-select-arrow',
  setup: (p) => {
    p.context.watch(SelectContext);
    p.context.watch(ShadcnSelectContext);

    p.lifecycle.onMounted(() => {
      const { updateRef } = p.context.get(ShadcnSelectContext);
      updateRef('arrowRef', p.view.getElement());
      p.view.getElement().className = 'w-4 h-4 opacity-50';
    });

    return {
      render: (renderer: RendererAPI) => {
        const h = renderer.createElement;
        console.log(p.view.getElement());
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
        ) as HTMLElement;
        console.log('arrow');
        console.log(element);
        return element;
      },
    };
  },
});

export const ShadcnSelectArrow = WebComponentAdapter(ShadcnSelectArrowPrototype);

customElements.define(`${CONFIG.shadcn.prefix}-select-arrow`, ShadcnSelectArrow);
