import { definePrototype, WebComponentAdapter } from '@/core';
import { asCheckboxIndicator } from '@/core/behaviors/as-checkbox';
import { ShadcnCheckboxContext } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';


export interface IndicatorProps { }

// 基础样式
const baseClasses = [
    'flex',
    'items-center',
    'justify-center',
    'h-3.5',
    'w-3.5',
    'text-primary-foreground',
    'rounded-sm',
    'transition-colors',
];

// 状态样式
const stateClasses = [
    'opacity-0',
    'data-[state=checked]:bg-primary',
    'data-[checked]:opacity-100',
    'data-[disabled]:cursor-not-allowed',
    'data-[disabled]:opacity-50',
];

// Icon 样式
const iconClasses = [
    'h-4',
    'w-4',
];

export const CheckboxIndicatorPrototype = definePrototype<IndicatorProps>({
    name: 'shadcn-checkbox-indicator',
    setup: (p) => {
        // 注入基础行为
        asCheckboxIndicator(p);

        // 监听复选框上下文
        p.context.watch(ShadcnCheckboxContext);

        // 组件挂载时更新引用
        p.lifecycle.onMounted(() => {
            const { updateRef, indicatorRef } = p.context.get(ShadcnCheckboxContext);
            const element = p.view.getElement();

            if (indicatorRef !== element) {
                updateRef('indicatorRef', element);
            }
        });

        // 渲染函数
        return (renderer) => {
            const hostElement = p.view.getElement();
            const allClasses = [...baseClasses, ...stateClasses].join(' ');

            hostElement.className = optimizeTailwindClasses(allClasses);

            // 清空已有内容，防止重复渲染
            hostElement.innerHTML = '';

            // 创建SVG图标
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
                    h('path', {
                        d: 'M20 6L9 17L4 12',
                    }),
                ]
            );
            hostElement.appendChild(svg);
        };
    },
});

export const ShadcnCheckboxIndicator = WebComponentAdapter(CheckboxIndicatorPrototype);