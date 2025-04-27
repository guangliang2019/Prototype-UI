import { definePrototype, WebComponentAdapter } from '@/core';
import { asCheckbox, CheckboxContext } from '@/core/behaviors/as-checkbox';
import {
    ShadcnCheckboxProps,
    SHADCN_CHECKBOX_DEFAULT_PROPS,
    ShadcnCheckboxContext,
    ShadcnCheckboxContextType,
} from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { ShadcnCheckboxIndicator } from './checkbox-indicator';
import { CheckboxExposes } from '@/core/behaviors/as-checkbox/interface';

// 确保 Indicator 组件已注册
if (!customElements.get('shadcn-checkbox-indicator')) {
    customElements.define('shadcn-checkbox-indicator', ShadcnCheckboxIndicator);
}

// 基础样式
const baseClasses = [
    'peer',
    'h-4',
    'w-4',
    'shrink-0',
    'rounded-sm',
    'border',
    'border-primary',
    'shadow',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
];

// 状态样式
const stateClasses = [
    'data-[state=checked]:bg-primary',
    'data-[state=checked]:text-primary-foreground',
    'data-[indeterminate]:bg-primary',
    'data-[indeterminate]:text-primary-foreground',
    'cursor-pointer',
];

const SHADCN_CHECKBOX_DEFAULT_CLASS = [...baseClasses, ...stateClasses].join(' ');

export const ShadcnCheckboxPrototype = definePrototype<ShadcnCheckboxProps, CheckboxExposes>({
    name: 'shadcn-checkbox',
    setup: (p) => {
        // 注入基础 Checkbox 行为
        asCheckbox(p);

        p.context.provide(ShadcnCheckboxContext, (updateContext) => {
            const context: ShadcnCheckboxContextType = {
                indicatorRef: null,
                updateRef: (name, ref) => {
                    const originalRef = context[name];

                    updateContext({
                        [name]: ref,
                    });
                    // 如果原始引用存在，移除它
                    if (originalRef && originalRef !== ref) originalRef.remove();
                },
            };
            return context;
        });

        let _originalCls = '';

        p.lifecycle.onMounted(() => {
            _originalCls = p.view.getElement().className;

            // 确保指示器被添加
            const hostElement = p.view.getElement();
            const { indicatorRef } = p.context.get(ShadcnCheckboxContext);

            if (!indicatorRef || !hostElement.contains(indicatorRef)) {
                const newIndicator = document.createElement('shadcn-checkbox-indicator');
                hostElement.appendChild(newIndicator);
            }
        });

        return () => {
            const hostElement = p.view.getElement();

            // 确保指示器存在
            const { indicatorRef } = p.context.get(ShadcnCheckboxContext);
            if (!indicatorRef || !hostElement.contains(indicatorRef)) {
                const newIndicator = document.createElement('shadcn-checkbox-indicator');
                hostElement.appendChild(newIndicator);
            }

            const allClasses = [SHADCN_CHECKBOX_DEFAULT_CLASS, _originalCls].filter(Boolean).join(' ');
            hostElement.className = optimizeTailwindClasses(allClasses);
        };
    },
});

export const ShadcnCheckbox = WebComponentAdapter(ShadcnCheckboxPrototype);
