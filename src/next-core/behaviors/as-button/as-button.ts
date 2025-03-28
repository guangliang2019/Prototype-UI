import { PrototypeHooks } from '../../interface';
import { ButtonActions, ButtonProps, ButtonState } from './interface';

export const DEFAULT_BUTTON_PROPS: ButtonProps = {
  disabled: false,
  autoFocus: false,
  onClick: () => {},
};

/**
 * 让使用了 asButton 的组件具有按钮的行为
 * @param hooks 原型钩子
 */
export function asButton(hooks: PrototypeHooks<ButtonProps>): {
  state: ButtonState;
  actions: ButtonActions;
} {
  const { event, defineProps, markAsTrigger, useState, watchProps, getProps, useMounted } = hooks;
  // 标记为触发器
  markAsTrigger();
  // 状态管理
  const hover = useState<boolean>(false, 'data-hover');
  const focus = useState<boolean>(false, 'data-focus');
  const focusVisible = useState<boolean>(false, 'data-focus-visible');
  const active = useState<boolean>(false, 'data-active');

  defineProps(DEFAULT_BUTTON_PROPS);

  const handleDisabledChange = (disabled: boolean) => {
    if (disabled) {
      event.focus.setPriority(-1);
      event.setAttribute('aria-disabled', 'true');
    } else {
      event.focus.setPriority(0);
      event.removeAttribute('aria-disabled');
    }
  };

  // 初始属性处理
  useMounted(() => {
    const props = getProps();
    handleDisabledChange(props.disabled ?? false);

    // 自动聚焦
    if (props.autoFocus) {
      event.focus.set(true);
    }
  });

  // 属性同步
  watchProps(['disabled'], ({ disabled }) => {
    handleDisabledChange(disabled ?? false);
  });

  // 注册事件监听
  // 鼠标悬停
  event.on('mouseenter', () => {
    hover.set(true);
  });
  event.on('mouseleave', () => hover.set(false));
  // 鼠标按下
  event.on('mousedown', () => active.set(true));
  // 鼠标释放
  event.on('mouseup', () => active.set(false));
  // 聚焦
  event.on('focus', () => {
    focus.set(true);
    focusVisible.set(active.value);
  });
  event.on('blur', () => {
    focus.set(false);
    focusVisible.set(false);
  });
  // 点击
  event.on('click', (e) => {
    const props = getProps();
    if (!focus.value || props.disabled) return;
    props.onClick?.(e as MouseEvent);
  });
  // 键盘按下
  event.on('keydown', (e) => {
    const props = getProps();
    if (!focus.value || props.disabled) return;
    const event = e as KeyboardEvent;
    if (event.key === 'Enter' || event.key === ' ') {
      props.onClick?.(event);
    }
  });

  // 导出动作
  const actions: ButtonActions = {
    focus() {
      try {
        event.focus.set(true);
      } catch (e) {
        console.warn('Cannot focus button before it is mounted');
      }
    },
    blur() {
      try {
        event.focus.set(false);
      } catch (e) {
        console.warn('Cannot blur button before it is mounted');
      }
    },
    click() {
      try {
        const props = getProps();
        if (!props.disabled) {
          event.click();
        }
      } catch (e) {
        console.warn('Cannot click button before it is mounted');
      }
    },
  };

  return {
    state: {
      hover,
      focus,
      focusVisible,
      active,
    },
    actions,
  };
}
