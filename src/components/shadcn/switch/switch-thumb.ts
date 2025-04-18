import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitchThumb } from '@/core/behaviors/as-switch';
import { ShadcnSwitchContext, ShadcnSwitchThumbProps } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';

const baseClasses = [
  'block',
  'rounded-full',
  'bg-background',
  'shadow-lg',
  'pointer-events-none',
  'transition-transform',
  'w-4',
  'h-4',
  'bg-background',
];

const stateClasses = [
  'translate-x-0',
  'data-[checked]:translate-x-4',
  'disabled:cursor-not-allowed disabled:opacity-50',
];

const SHADCN_SWITCH_THUMB_CLASS = [...baseClasses, ...stateClasses].join(' ');

export const ThumbPrototype = definePrototype<ShadcnSwitchThumbProps>({
  name: 'shadcn-switch-thumb',
  setup: (p) => {
    asSwitchThumb(p);
    let _originalCls = '';

    // watch shadcn-switch context
    p.context.watch(ShadcnSwitchContext);

    // update thumbRef
    p.lifecycle.onMounted(() => {
      const { updateRef, thumbRef } = p.context.get(ShadcnSwitchContext);
      const element = p.view.getElement();
      _originalCls = element.className;

      if (thumbRef !== element) {
        updateRef('thumbRef', element);
      }
    });

    return {
      render() {
        const hostElement = p.view.getElement();
        hostElement.className = optimizeTailwindClasses(
          [_originalCls, SHADCN_SWITCH_THUMB_CLASS].join(' ')
        );
      },
    };
  },
});

export const ShadcnSwitchThumb = WebComponentAdapter(ThumbPrototype);
