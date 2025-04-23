import { PrototypeAPI } from '@/core/interface';
import { ButtonExposes, ButtonProps, ButtonState, DEFAULT_BUTTON_PROPS } from './interface';

/**
 * 让使用了 asButton 的组件具有按钮的行为
 * @param p 原型 API
 */
const asButton = <
  Props extends ButtonProps = ButtonProps,
  Exposes extends ButtonExposes = ButtonExposes,
>(
  p: PrototypeAPI<Props, Exposes>
): {
  states: ButtonState;
} => {
  // 标记为触发器
  p.role.asTrigger();

  // 状态管理
  const hover = p.state.define<boolean>(false, 'data-hover');
  const focus = p.state.define<boolean>(false, 'data-focus');
  const focusVisible = p.state.define<boolean>(false, 'data-focus-visible');
  const active = p.state.define<boolean>(false, 'data-active');

  // props
  p.props.define(DEFAULT_BUTTON_PROPS as Props);

  const handleDisabledChange = (disabled: boolean) => {
    if (disabled) {
      p.event.focus.setPriority(-1);
      p.event.setAttribute('aria-disabled', 'true');
    } else {
      p.event.focus.setPriority(0);
      p.event.removeAttribute('aria-disabled');
    }
  };

  // 初始属性处理
  p.lifecycle.onMounted(() => {
    const props = p.props.get();
    handleDisabledChange(props.disabled ?? false);

    // 自动聚焦
    if (props.autoFocus) {
      p.event.focus.set(true);
    }
  });

  // 属性同步
  p.props.watch(['disabled'], ({ disabled }) => {
    handleDisabledChange(disabled ?? false);
  });

  // 注册事件监听
  // 鼠标悬停
  p.event.on('mouseenter', () => {
    hover.set(true);
  });
  p.event.on('mouseleave', () => hover.set(false));
  // 鼠标按下
  p.event.on('mousedown', () => active.set(true));
  // 鼠标释放
  p.event.on('mouseup', () => active.set(false));
  // 聚焦
  p.event.on('focus', () => {
    focus.set(true);
    focusVisible.set(active.value);
  });
  p.event.on('blur', () => {
    focus.set(false);
    focusVisible.set(false);
  });
  // 点击
  p.event.on('click', (e) => {
    const props = p.props.get();
    if (!focus.value || props.disabled) return;
    props.onClick?.(e as MouseEvent);
  });
  // 键盘按下
  p.event.on('keydown', (e) => {
    const props = p.props.get();
    if (!focus.value || props.disabled) return;
    const event = e as KeyboardEvent;
    if (event.key === 'Enter' || event.key === ' ') {
      props.onClick?.(event);
    }
  });

  // 导出动作
  // p.expose.define('focus', () => {
  //   p.event.focus.set(true);
  // });
  // p.expose.define('blur', () => {
  //   p.event.focus.set(false);
  // });
  // p.expose.define('click', () => {
  //   const props = p.props.get();
  //   if (!props.disabled) {
  //     p.event.click();
  //   }
  // });

  return {
    states: {
      hover,
      focus,
      focusVisible,
      active,
    },
  };
};

export default asButton;
