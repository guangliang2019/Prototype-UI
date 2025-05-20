import { PrototypeAPI } from '@/core/interface';
import {
    SliderContext,
    SliderContextType,
    SliderTrackProps,
    SliderTrackExposes,
} from './interface';

const asSliderTrack = <Props extends SliderTrackProps, Exposes extends SliderTrackExposes>(
    p: PrototypeAPI<Props, Exposes>
) => {
    // 先 watch，确保依赖关系建立
    p.context.watch(SliderContext);

    // 计算点击位置对应的值
    const _calculateValue = (clientX: number): number => {
        const context = p.context.get(SliderContext);
        const trackRect = context.trackRef.getBoundingClientRect();
        const percentage = (clientX - trackRect.left) / trackRect.width;
        const rawValue = context.min + percentage * (context.max - context.min);
        const steppedValue = Math.round(rawValue / context.step) * context.step;
        return Math.max(context.min, Math.min(context.max, steppedValue));
    };

    // 处理轨道点击
    const _handleClick = (event: MouseEvent): void => {
        const context = p.context.get(SliderContext);
        console.log('trackRef:', context.trackRef);
        if (context.disabled) return;
        const newValue = _calculateValue(event.clientX);
        console.log('newValue:', newValue, 'oldValue:', context.value);
        context.updateValue(newValue);
        console.log('dianjiguidao')
    };

    // 生命周期处理
    p.lifecycle.onMounted(() => {
        const component = p.view.getElement();
        const context = p.context.get(SliderContext);
        context.trackRef = component;
    });

    // 事件监听
    p.event.on('click', _handleClick as EventListener);

    // 清理
    p.lifecycle.onBeforeUnmount(() => {

    });
};

export default asSliderTrack;
