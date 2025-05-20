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
    // 先 watch，确保依赖关系建立
    p.context.watch(SliderContext);

    // 计算范围百分比
    const _calculateRangeStyle = (): string => {
        const context = p.context.get(SliderContext);
        const percentage = ((context.value - context.min) / (context.max - context.min)) * 100;
        return `width: ${percentage}%`;
    };

    // 监听值变化
    p.context.watch(SliderContext, (context, keys) => {
        if (keys.includes('value')) {
            const component = p.view.getElement();
            component.style.width = _calculateRangeStyle();
        }
    });

    // 初始化样式
    p.lifecycle.onMounted(() => {
        const component = p.view.getElement();
        component.style.width = _calculateRangeStyle();
    });
};

export default asSliderRange;
