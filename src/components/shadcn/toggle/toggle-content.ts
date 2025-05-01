import { definePrototype, WebComponentAdapter } from '@/core';
import  asToggleContent  from '@/core/behaviors/as-toggle/as-toggle-content';
import { ShadcnToggleContext } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';

// 基础样式
const baseClasses = [
    'flex',
    'items-center',
    'justify-center',
    'h-5',
    'w-5',
    'text-primary-foreground',
    'rounded-full',
    'transition-colors',
];

// 状态样式
const stateClasses = [

    'data-[state=pressed]:bg-primary',
    'data-[state=pressed]:opacity-100',
    'data-[disabled]:cursor-not-allowed',
    'data-[disabled]:opacity-50',
    'data-[hover=true]:opacity-50'
    
];

// Icon 样式
const iconClasses = [
    'h-4',
    'w-4',

];

export const ToggleContentPrototype = definePrototype<{}>({
    name: 'shadcn-toggle-content',
    setup: (p) => {
        // 注入 toggle content 行为
        asToggleContent(p);

        p.context.watch(ShadcnToggleContext);

        p.lifecycle.onMounted(() => {
            const { updateRef, toggleRef } = p.context.get(ShadcnToggleContext);
            const element = p.view.getElement();
            if (toggleRef !== element) {
                updateRef('toggleRef', element);
            }
        });

        // 渲染函数
        return (renderer) => {
            const hostElement = p.view.getElement();
            const allClasses = [...baseClasses, ...stateClasses].join(' ');

            hostElement.className = optimizeTailwindClasses(allClasses);

            hostElement.innerHTML = '';

            const h = renderer.createElement;
            const svg = h(
                'svg',
                {
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: '#fff',
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

export const ShadcnToggleContent = WebComponentAdapter(ToggleContentPrototype);