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
  // 只watch value用于可能的样式联动，但不动track本身的宽高
  p.context.watch(SliderContext, (context, keys) => {
    if (keys.includes('value')) {
      // 这里只能做动画、active样式等，不能动宽高
    }
  });

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
    if (context.disabled) return;
    const newValue = _calculateValue(event.clientX);
    context.updateValue(newValue);
  };

  // 生命周期处理
  p.lifecycle.onMounted(() => {
    const component = p.view.getElement();
    component.style.display = 'block';
    const context = p.context.get(SliderContext);
    context.trackRef = component;
    // 不要动component.style.width/height
  });

  // 事件监听
  p.event.on('click', _handleClick as EventListener);

  // 清理
  p.lifecycle.onBeforeUnmount(() => {
    // 无需特殊清理
  });
};

export default asSliderTrack;
