import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitchThumb } from '@/core/behaviors/as-switch';
import { ShadcnSwitchContext } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';

export interface ThumbProps { }


const baseClasses = [
    'block',
    'rounded-full',
    'bg-background',
    'shadow-lg',
    'pointer-events-none',
    'transition-transform',
    'w-5',
    'h-5',
];


const stateClasses = [
    'translate-x-0',
    'data-[checked]:translate-x-5',
    'disabled:cursor-not-allowed disabled:opacity-50'
]

export const ThumbPrototype = definePrototype<ThumbProps>({
    name: 'shadcn-switch-thumb',
    setup: (p) => {
        // 监听两个上下文
        asSwitchThumb(p)

        p.context.watch(ShadcnSwitchContext);

        p.lifecycle.onMounted(() => {

            const { updateRef, thumbRef } = p.context.get(ShadcnSwitchContext);
            const element = p.view.getElement();

            if (thumbRef !== element) {
                updateRef('thumbRef', element);
            }
        });

        return {
            render() {
                const hostElement = p.view.getElement();

                const allClasses = [
                    ...baseClasses,
                    ...stateClasses,
                ].join(' ');

                hostElement.className = optimizeTailwindClasses(allClasses);
            }
        };
    }
});

export const ShadcnSwitchThumb = WebComponentAdapter(ThumbPrototype);
