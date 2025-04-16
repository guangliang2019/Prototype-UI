import { ShadcnSelectContentProps, ShadcnSelectContext } from './interface';
import { definePrototype, WebComponentAdapter } from '@/core';
import { asSelectContent } from '@/core/behaviors/as-select';
import { CONFIG } from '../_config';
import { asTransition } from '@/core/behaviors/as-transition';

const flexCls = 'flex flex-col items-start';
const positionCls = 'absolute z-50 top-10';
const sizeCls = 'max-h-96 min-w-[8rem] p-1';
const shapeCls = 'rounded-md shadow-md';
const borderCls = 'border';
const colorCls = 'bg-popover text-popover-foreground';
const otherCls = 'overflow-hidden';
const animationCls =
  'data-[enter]:opacity-100 data-[enter]:scale-100 data-[enter]:translate-y-0 data-[leave]:opacity-0 data-[leave]:scale-95 data-[leave]:-translate-y-2 data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:-translate-y-2 transition-all duration-80';

const SHADCN_SELECT_CONTENT_CLASS = [
  'shadcn-select-content',
  flexCls,
  positionCls,
  sizeCls,
  shapeCls,
  borderCls,
  colorCls,
  otherCls,
  animationCls,
]
  .join(' ')
  .trimEnd();

export const ShadcnSelectContentPrototype = definePrototype<ShadcnSelectContentProps>({
  name: `${CONFIG.shadcn.prefix}-select-content`,
  setup: (p) => {
    // role
    const { states } = asSelectContent(p);
    const { actions: transitionActions } = asTransition(p);

    p.props.define({
      enterDuration: 80,
      leaveDuration: 80,
      show: false,
    } as ShadcnSelectContentProps);

    p.state.watch(states.visible, (v) => {
      v ? transitionActions.enter() : transitionActions.leave();
    });

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
