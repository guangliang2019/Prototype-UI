import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch } from '@/core/behaviors/as-switch';
import { ShadcnSwitchProps, ShadcnSwitchContext, ShadcnSwitchContextType } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';

const baseClasses = [
  'inline-flex',
  'items-center',
  'border-transparent',
  'border-2',
  'w-9',
  'h-5',
  'relative',
  'rounded-full',
  'transition-colors',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-2',
];

const stateClasses = [
  'bg-input',
  'data-[checked]:bg-primary',
  'cursor-pointer',
  'disabled:cursor-not-allowed disabled:opacity-50',
];

const SHADCN_SWITCH_CLASS = [...baseClasses, ...stateClasses].join(' ');

export const ShadcnSwitchPrototype = definePrototype<ShadcnSwitchProps>({
  name: 'shadcn-switch',
  setup: (p) => {
    // inject base switch behavior
    asSwitch(p);

    p.context.provide(ShadcnSwitchContext, (updateContext) => {
      const context: ShadcnSwitchContextType = {
        thumbRef: document.createElement('shadcn-switch-thumb'),
        updateRef: (name, ref) => {
          const originalRef = context[name];

          updateContext({
            [name]: ref,
          });
          // if original ref exists, remove it, this will happen when developer use switch-thumb manually
          if (originalRef) originalRef.remove();
        },
      };
      return context;
    });

    // get original class name
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return {
      render() {
        const hostElement = p.view.getElement();

        const { thumbRef } = p.context.get(ShadcnSwitchContext);
        if (!thumbRef || !hostElement.contains(thumbRef)) {
          const newThumb = document.createElement('shadcn-switch-thumb');
          hostElement.appendChild(newThumb);
        }

        const allClasses = [SHADCN_SWITCH_CLASS, _originalCls].join(' ');
        hostElement.className = optimizeTailwindClasses(allClasses);
      },
    };
  },
});

export const ShadcnSwitch = WebComponentAdapter(ShadcnSwitchPrototype);
