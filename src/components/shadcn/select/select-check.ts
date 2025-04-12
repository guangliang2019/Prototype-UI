import { ShadcnSelectContext } from './interface';
import { definePrototype, RendererAPI, WebComponentAdapter } from '@/core';
import { SelectContext } from '@/core/behaviors/as-select';
import { CONFIG } from '../_config';

export const ShadcnSelectCheckPrototype = definePrototype<{}>({
  name: `${CONFIG.shadcn.prefix}-select-check`,
  setup: (p) => {
    p.context.watch(SelectContext);
    p.context.watch(ShadcnSelectContext);

    p.lifecycle.onMounted(() => {
      const { updateRef, checkRef } = p.context.get(ShadcnSelectContext);
      const element = p.view.getElement();
      if (element !== checkRef) updateRef('checkRef', p.view.getElement());

      if (element.children.length > 0 || element.textContent !== '') {
        return;
      }

      element.className = 'w-4 h-4 invisible data-[selected]:visible';
    });

    return {
      render: (renderer: RendererAPI) => {
        const h = renderer.createElement;
        return h(
          'svg',
          {
            viewBox: '0 0 15 15',
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            class: 'shadcn-icon shadcn-select-check',
          },
          [
            h('path', {
              d: 'M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z',
              fill: 'currentColor',
              fillRule: 'evenodd',
              clipRule: 'evenodd',
            }),
          ]
        ) as HTMLElement;
      },
    };
  },
});

export const ShadcnSelectCheck = WebComponentAdapter(ShadcnSelectCheckPrototype);
