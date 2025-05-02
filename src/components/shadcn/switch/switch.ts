import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch, SwitchContext } from '@/core/behaviors/as-switch';
import {
  ShadcnSwitchProps,
  SHADCN_SWITCH_DEFAULT_PROPS,
  ShadcnSwitchContext,
  ShadcnSwitchContextType,
} from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { ShadcnSwitchThumb } from './switch-thumb';
import { SwitchExposes } from '@/core/behaviors/as-switch/interface';

// 确保 Thumb 组件已注册
if (!customElements.get('shadcn-switch-thumb')) {
  customElements.define('shadcn-switch-thumb', ShadcnSwitchThumb);
}

const baseClasses = [
  'inline-flex',
  'items-center',
  'w-9',
  'h-5',
  'border-2',
  'border-transparent',
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

const SHADCN_SWITCH_DEFAULT_CLASS = [...baseClasses, ...stateClasses].join(' ');

export const ShadcnSwitchPrototype = definePrototype<ShadcnSwitchProps, SwitchExposes>({
  name: 'shadcn-switch',
  setup: (p) => {
    // 注入基础 Switch 行为
    asSwitch(p);

    p.context.provide(ShadcnSwitchContext, (updateContext) => {
      const context: ShadcnSwitchContextType = {
        thumbRef: document.createElement('shadcn-switch-thumb'),
        updateRef: (name, ref) => {
          const originalRef = context[name];

          updateContext({
            [name]: ref,
          });
          // 如果原始引用存在，移除它
          if (originalRef) originalRef.remove();
        },
      };
      return context;
    });

    let _originalCls = '';

    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return () => {
      const hostElement = p.view.getElement();

      const { thumbRef } = p.context.get(ShadcnSwitchContext);
      if (!thumbRef || !hostElement.contains(thumbRef)) {
        const newThumb = document.createElement('shadcn-switch-thumb');
        hostElement.appendChild(newThumb);
      }

      const allClasses = [SHADCN_SWITCH_DEFAULT_CLASS, _originalCls].filter(Boolean).join(' ');
      hostElement.className = optimizeTailwindClasses(allClasses);
    };
  },
});

export const ShadcnSwitch = WebComponentAdapter(ShadcnSwitchPrototype);
