import { asSelectTrigger } from '@/next-core/behaviors/as-select';
import { ShadcnSelectContext, ShadcnSelectTriggerProps } from './interface';
import { definePrototype, RendererAPI, WebComponentAdapter } from '@/next-core';

const SHADCN_SELECT_TRIGGER_CLASS =
  'shadcn-select-trigger cursor-pointer flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1';

export const ShadcnSelectTriggerPrototype = definePrototype<ShadcnSelectTriggerProps>({
  setup: (p) => {
    // role
    p.context.watch(ShadcnSelectContext);
    asSelectTrigger(p);

    let _currentValueRef: HTMLElement | undefined;
    let _currentArrowRef: HTMLElement | undefined;
    let _dirty = false;
    p.context.watch(ShadcnSelectContext, (context, changedKeys) => {
      if (changedKeys.length === 0) return;
      const { valueRef, arrowRef } = context;
      if (_currentValueRef !== valueRef) _dirty = true;
      if (_currentArrowRef !== arrowRef) _dirty = true;
      if (_dirty) {
        p.view.update();
        _dirty = false;
      }
    });

    return {
      render: (renderer: RendererAPI) => {
        const h = renderer.createElement;
        const root = p.view.getElement();
        // class name
        const className = root.className || '';
        root.className = [SHADCN_SELECT_TRIGGER_CLASS, className].join(' ').trimEnd();

        // 获取 context 中的 valueRef 和 arrowRef
        const { valueRef, arrowRef } = p.context.get(ShadcnSelectContext);

        _currentArrowRef?.remove();
        _currentValueRef?.remove();
        _currentValueRef = valueRef;
        _currentArrowRef = arrowRef;

        return h(
          'svg',
          {
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            class: 'shadcn-icon shadcn-select-arrow h-4 w-4 opacity-50',
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
      },
    };
  },
});

export const ShadcnSelectTrigger = WebComponentAdapter(ShadcnSelectTriggerPrototype);

customElements.define('shadcn-select-trigger', ShadcnSelectTrigger);
