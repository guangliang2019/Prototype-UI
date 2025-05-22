import { PrototypeAPI } from '@/core/interface';
import {
    SliderContext,
    SliderContextType,
    SliderThumbProps,
    SliderThumbExposes,
} from './interface';

const asSliderThumb = <Props extends SliderThumbProps, Exposes extends SliderThumbExposes>(
    p: PrototypeAPI<Props, Exposes>
) => {
    p.context.watch(SliderContext, (context, keys) => {
        if (keys.includes('value')) {
            const percent = (context.value - context.min) / (context.max - context.min);
            const component = p.view.getElement();
            component.style.position = 'absolute';
            component.style.left = `calc(${percent * 100}% - 0.5em)`;
        }
    });

    // 处理键盘导航
    const _handleKeyDown = (event: KeyboardEvent): void => {
        const context = p.context.get(SliderContext);
        if (context.disabled) return;

        const step = context.step;
        let newValue = context.value;

        switch (event.key) {
            case 'ArrowLeft':
                newValue -= step;
                break;
            case 'ArrowRight':
                newValue += step;
                break;
            case 'Home':
                newValue = context.min;
                break;
            case 'End':
                newValue = context.max;
                break;
            default:
                return;
        }

        event.preventDefault();
        context.updateValue(newValue);
    };

    const _calculateValue = (clientX: number): number => {
        const context = p.context.get(SliderContext);
        const trackRect = context.trackRef.getBoundingClientRect();
        const percentage = (clientX - trackRect.left) / trackRect.width;
        const rawValue = context.min + percentage * (context.max - context.min);
        const steppedValue = Math.round(rawValue / context.step) * context.step;
        return Math.max(context.min, Math.min(context.max, steppedValue));
    };

    const _handleMouseDown = (event: MouseEvent) => {
        const context = p.context.get(SliderContext);
        if (context.disabled) return;
        event.preventDefault();
        context.dragging.set(true);
        document.addEventListener('mousemove', _handleMouseMove);
        document.addEventListener('mouseup', _handleMouseUp);
    };

    const _handleMouseMove = (event: MouseEvent) => {
        const context = p.context.get(SliderContext);
        if (!context.dragging.value) return;
        const newValue = _calculateValue(event.clientX);
        context.updateValue(newValue);
    };

    const _handleMouseUp = () => {
        const context = p.context.get(SliderContext);
        context.dragging.set(false);
        document.removeEventListener('mousemove', _handleMouseMove);
        document.removeEventListener('mouseup', _handleMouseUp);
    };

    // 生命周期处理
    p.lifecycle.onMounted(() => {
        const component = p.view.getElement();
        const context = p.context.get(SliderContext);
        context.thumbRef = component;
    });

    // 事件监听
    p.event.on('keydown', _handleKeyDown as EventListener);
    p.event.on('mousedown', _handleMouseDown as EventListener);

    // 暴露方法
    p.expose.define('focus', () => {
        const component = p.view.getElement();
        component.focus();
    });
    p.expose.define('blur', () => {
        const component = p.view.getElement();
        component.blur();
    });
};

export default asSliderThumb;
