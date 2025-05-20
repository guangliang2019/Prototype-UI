import { PrototypeAPI } from '@/core/interface';
import {
    SliderContext,
    SliderContextType,
    SliderProps,
    SliderExposes,
    DEFAULT_SLIDER_PROPS,
} from './interface';

const asSlider = <Props extends SliderProps, Exposes extends SliderExposes>(
    p: PrototypeAPI<Props, Exposes>
) => {
    // props
    p.props.define(DEFAULT_SLIDER_PROPS as Props);

    // state
    const dragging = p.state.define<boolean>(false, 'data-dragging');
    const focused = p.state.define<boolean>(false, 'data-focused');

    p.context.provide(SliderContext, (updateContext) => {
        const { defaultValue = 50, min = 0, max = 100, step = 1, disabled = false } = p.props.get();

        const context: SliderContextType = {
            value: defaultValue,
            min,
            max,
            step,
            disabled,
            dragging,
            focused,
            rootRef: p.view.getElement(),
            trackRef: null as unknown as HTMLElement,
            thumbRef: null as unknown as HTMLElement,
            updateValue: (newValue: number) => {
                // 每次都用最新的 props
                const { min, max, step } = p.props.get();
                const clampedValue = Math.max(min ?? 0, Math.min(max ?? 100, newValue));
                const steppedValue = Math.round(clampedValue / (step ?? 1)) * (step ?? 1);
                console.log('updateValue called, newValue:', newValue, 'steppedValue:', steppedValue, 'oldValue:', context.value);
                updateContext({ value: steppedValue });
            },
            focus: () => {
                focused.set(true);
                context.thumbRef?.focus();
            },
            blur: () => {
                focused.set(false);
                context.thumbRef?.blur();
            },
        };

        return context;
    });

    // 暴露方法
    p.expose.define('focus', () => {
        const context = p.context.get(SliderContext);
        context.focus();
    });
    p.expose.define('blur', () => {
        const context = p.context.get(SliderContext);
        context.blur();
    });

    p.lifecycle.onMounted(() => {
        const root = p.view.getElement();
        // 检查是否已存在 input，避免重复插入
        let input = root.querySelector('input[type=hidden][data-slider-value]') as HTMLInputElement | null;
        if (!input) {
            input = document.createElement('input') as HTMLInputElement;
            input.type = 'hidden';
            input.setAttribute('data-slider-value', 'true');
            root.appendChild(input);
        }
        const context = p.context.get(SliderContext);
        input.value = String(context.value);
        // 监听 value 变化同步 input
        p.context.watch(SliderContext, (ctx, keys) => {
            if (keys.includes('value')) {
                input!.value = String(ctx.value);
            }
        });
    });
};

export default asSlider;

