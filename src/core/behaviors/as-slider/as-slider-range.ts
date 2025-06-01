import { PrototypeAPI } from '@/core/interface';
import {
  SliderContext,
  SliderContextType,
  SliderRangeProps,
  SliderRangeExposes,
} from './interface';

const asSliderRange = <Props extends SliderRangeProps, Exposes extends SliderRangeExposes>(
  p: PrototypeAPI<Props, Exposes>
) => {
  p.context.watch(SliderContext, (context, keys) => {
    if (keys.includes('value')) {
      const component = p.view.getElement();
      const percentage = ((context.value - context.min) / (context.max - context.min)) * 100;
      component.style.width = `${percentage}%`;
    }
  });

  // 初始化样式
  p.lifecycle.onMounted(() => {
    const component = p.view.getElement();
    const context = p.context.get(SliderContext);
    const percentage = ((context.value - context.min) / (context.max - context.min)) * 100;
    component.style.width = `${percentage}%`;
  });
};

export default asSliderRange;
