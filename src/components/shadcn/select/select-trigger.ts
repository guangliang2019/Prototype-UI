import { asSelectTrigger, SelectTriggerExposes } from '@/core/behaviors/as-select';
import { ShadcnSelectContext, ShadcnSelectTriggerProps } from './interface';
import { definePrototype, RendererAPI, WebComponentAdapter } from '@/core';
import { CONFIG } from '../_config';
const SHADCN_SELECT_TRIGGER_CLASS =
  'shadcn-select-trigger cursor-pointer flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1';

export const ShadcnSelectTriggerPrototype = definePrototype<
  ShadcnSelectTriggerProps,
  SelectTriggerExposes
>({
  name: `${CONFIG.shadcn.prefix}-select-trigger`,
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

    return (renderer: RendererAPI) => {
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

      return renderer.createFragment([valueRef, arrowRef]);
    };
  },
});

export const ShadcnSelectTrigger = WebComponentAdapter(ShadcnSelectTriggerPrototype);
