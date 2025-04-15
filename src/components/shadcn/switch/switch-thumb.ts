import { definePrototype, WebComponentAdapter } from '@/core';
import { SwitchContext } from '@/core/behaviors/as-switch';
import { ShadcnSwitchContext } from './interface';

export interface ThumbProps { }

export const ThumbPrototype = definePrototype<ThumbProps>({
    name: 'shadcn-switch-thumb',
    setup: (p) => {
        // 监听两个上下文
        p.context.watch(SwitchContext);      
        p.context.watch(ShadcnSwitchContext); 

        p.lifecycle.onMounted(() => {

            const { updateRef, thumbRef } = p.context.get(ShadcnSwitchContext);
            const element = p.view.getElement();


            if (thumbRef !== element) {
                updateRef('thumbRef', element);
            }

            // 添加对父元素点击的监听
            const parentElement = element.parentElement;
            if (parentElement) {
                parentElement.addEventListener('click', () => {
                    setTimeout(() => p.view.update(), 10);
                });
            }
        });

        return {
            render() {
                const hostElement = p.view.getElement();

                const switchContext = p.context.get(SwitchContext);
                const isChecked = switchContext?.checked?.value;


                const parentElement = hostElement.parentElement;
                const parentChecked = parentElement?.getAttribute('data-checked') !== null;

                // 综合判断状态
                const finalChecked = isChecked || parentChecked;

                const isDisabled = parentElement?.hasAttribute('disabled') || false;

                console.log('Thumb render - context checked:', isChecked,
                    'parent checked:', parentChecked,
                    'final:', finalChecked);

                // Thumb 样式
                const baseClasses = [
                    'absolute',
                    'rounded-full',
                    'bg-[rgb(9,9,11)]',
                    'shadow-sm',
                    'z-[2]',
                    'pointer-events-none',
                    'transition-transform'
                ];

                const sizeClasses = [
                    'w-[26px]',
                    'h-[26px]',
                    'top-[2px]',
                    'left-[2px]'
                ];

                const stateClasses = finalChecked
                    ? ['translate-x-[26px]']
                    : ['translate-x-0'];

                const disabledClasses = isDisabled
                    ? ['opacity-50']
                    : [];

                const allClasses = [
                    ...baseClasses,
                    ...sizeClasses,
                    ...stateClasses,
                    ...disabledClasses
                ].join(' ');

                hostElement.className = allClasses;
            }
        };
    }
});

export const ShadcnSwitchThumb = WebComponentAdapter(ThumbPrototype);
