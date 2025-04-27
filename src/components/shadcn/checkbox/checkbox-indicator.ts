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
    'h-4',
    'w-4',
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

            // 添加默认的 check 图标
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M20 6L9 17L4 12');

            svg.appendChild(path);
            element.appendChild(svg);
        });

        // 渲染函数
        return () => {
            const hostElement = p.view.getElement();
            const allClasses = [...baseClasses, ...stateClasses].join(' ');

            hostElement.className = optimizeTailwindClasses(allClasses);

            // 设置图标样式
            const svg = hostElement.querySelector('svg');
            if (svg) {
                svg.setAttribute('class', iconClasses.join(' '));
            }
        };
    },
});

export const ShadcnCheckboxIndicator = WebComponentAdapter(CheckboxIndicatorPrototype);