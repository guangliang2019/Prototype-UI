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
        const { min, max, step } = p.props.get();
        const clampedValue = Math.max(min ?? 0, Math.min(max ?? 100, newValue));
        const steppedValue = Math.round(clampedValue / (step ?? 1)) * (step ?? 1);
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
};

export default asSlider;
