import { definePrototype, WebComponentAdapter } from '@/core';
import { asToggle } from '@/core/behaviors/as-toggle';
import {
    ShadcnToggleProps,
    SHADCN_TOGGLE_DEFAULT_PROPS,
    ShadcnToggleContext,
    ShadcnToggleContextType,
} from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import {ShadcnToggleContent} from './toggle-content'
import { ToggleExposes } from '@/core/behaviors/as-toggle/interface';

if (!customElements.get('shadcn-toggle-content')) {
    customElements.define('shadcn-toggle-content', ShadcnToggleContent);
}

// shadcn/ui toggle 基础样式
const baseClasses = [
    'w-10',
    'h-10',
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'shadow-sm',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    
];

// 状态样式
const stateClasses = [
    'cursor-pointer',
    'data-[state=pressed]:bg-primary',
    'data-[state=pressed]:text-primary-foreground',
];

const SHADCN_TOGGLE_DEFAULT_CLASS = [...baseClasses, ...stateClasses].join(' ');

export const ShadcnTogglePrototype = definePrototype<ShadcnToggleProps, ToggleExposes>({
    name: 'shadcn-toggle',
    setup: (p) => {
        // 注入 Toggle 行为
        asToggle(p);

        p.context.provide(ShadcnToggleContext, (updateContext) => {
            const context: ShadcnToggleContextType = {
                toggleRef: null,
                updateRef: (name, ref) => {
                    const originalRef = context[name];
                    updateContext({
                        [name]: ref,
                    });
                    if (originalRef && originalRef !== ref) originalRef.remove();
                },
            };
            return context;
        });

        let _originalCls = '';

        p.lifecycle.onMounted(() => {
            _originalCls = p.view.getElement().className;

            const hostElement = p.view.getElement();

            if (!hostElement.querySelector('shadcn-toggle-content')) {
                const toggleContent = document.createElement('shadcn-toggle-content');
                hostElement.appendChild(toggleContent);
            }
        });

        return () => {
            const hostElement = p.view.getElement();
            const allClasses = [SHADCN_TOGGLE_DEFAULT_CLASS, _originalCls].filter(Boolean).join(' ');
            hostElement.className = optimizeTailwindClasses(allClasses);
        };
    },
});

export const ShadcnToggle = WebComponentAdapter(ShadcnTogglePrototype);