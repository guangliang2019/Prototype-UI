import { ShadcnSelectContentProps, ShadcnSelectContext } from './interface';
import { definePrototype, WebComponentAdapter } from '@/core';
import { asSelectContent } from '@/core/behaviors/as-select';

const flexCls = 'flex flex-col items-start';
const positionCls = 'absolute z-50 top-10';
const sizeCls = 'max-h-96 min-w-[8rem] p-1';
const shapeCls = 'rounded-md shadow-md';
const borderCls = 'border';
const colorCls = 'bg-popover text-popover-foreground';
const otherCls = 'popover-animated-in overflow-hidden';
const SHADCN_SELECT_CONTENT_CLASS = [
  'shadcn-select-content',
  'data-[visible]:visible invisible',
  flexCls,
  positionCls,
  sizeCls,
  shapeCls,
  borderCls,
  colorCls,
  otherCls,
]
  .join(' ')
  .trimEnd();

export const ShadcnSelectContentPrototype = definePrototype<ShadcnSelectContentProps>({
  name: 'shadcn-select-content',
  setup: (p) => {
    // role
    asSelectContent(p);

    // context
    p.context.watch(ShadcnSelectContext);

    return {
      render: () => {
        const root = p.view.getElement();
        const className = root.className || '';
        root.className = [SHADCN_SELECT_CONTENT_CLASS, className].join(' ').trimEnd();
      },
    };
  },
});

export const ShadcnSelectContent = WebComponentAdapter(ShadcnSelectContentPrototype);
