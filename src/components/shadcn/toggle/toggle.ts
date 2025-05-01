import { definePrototype, WebComponentAdapter } from '@/core';
import { asToggle } from '@/core/behaviors/as-toggle';
import {
    ShadcnToggleProps,
    SHADCN_TOGGLE_DEFAULT_PROPS,
    ShadcnToggleContext,
    ShadcnToggleContextType,
} from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { ToggleExposes } from '@/core/behaviors/as-toggle/interface';

// shadcn/ui newyork 风格 toggle 基础样式
const baseClasses = [
    'w-9',
    'h-9',
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
    'cursor-pointer',
    'bg-background',
];

const stateClasses = [
    'data-[state=pressed]:bg-primary',
    'data-[state=pressed]:text-primary-foreground',
];

const iconClasses = [
    'h-4',
    'w-4',
    'pointer-events-none',
];

const SHADCN_TOGGLE_DEFAULT_CLASS = [...baseClasses, ...stateClasses].join(' ');

export const ShadcnTogglePrototype = definePrototype<ShadcnToggleProps, ToggleExposes>({
    name: 'shadcn-toggle',
    setup: (p) => {
        // 注入 Toggle 行为
        asToggle(p);

        
        let _originalCls = '';

        p.lifecycle.onMounted(() => {
            _originalCls = p.view.getElement().className;
        });

        // 渲染函数
        return (renderer) => {
            const hostElement = p.view.getElement();
            const allClasses = [SHADCN_TOGGLE_DEFAULT_CLASS, _originalCls].filter(Boolean).join(' ');
            hostElement.className = optimizeTailwindClasses(allClasses);

            // 清空已有内容，防止重复渲染
            hostElement.innerHTML = '';

            // SVG 图标，状态与 toggle 保持一致
            const h = renderer.createElement;
            const svg = h(
                'svg',
                {
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '2',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    class: iconClasses.join(' '),
                },
                [
                    h('path', { d: 'M6 4h8a4 4 0 0 1 0 8H6z' }),
                    h('path', { d: 'M6 12h9a4 4 0 0 1 0 8H6z' }),
                ]
            );
            hostElement.appendChild(svg);


        };
    },
});

export const ShadcnToggle = WebComponentAdapter(ShadcnTogglePrototype);