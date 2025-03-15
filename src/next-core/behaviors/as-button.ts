import { PrototypeHooks, State } from '../interface';

export interface ButtonProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 点击事件处理器 */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

export interface ButtonState {
  /** 是否处于悬停状态 */
  hover: State<boolean>;
  /** 是否处于聚焦状态 */
  focus: State<boolean>;
  /** 是否显示聚焦轮廓 */
  focusVisible: State<boolean>;
  /** 是否处于激活状态 */
  active: State<boolean>;
}

export interface ButtonActions {
  /** 聚焦按钮 */
  focus(): void;
  /** 失焦按钮 */
  blur(): void;
  /** 点击按钮 */
  click(): void;
}

/**
 * 让使用了 asButton 的组件具有按钮的行为
 * @param hooks 原型钩子
 */
export function asButton<P extends ButtonProps>(
  hooks: PrototypeHooks<P>
): {
  state: ButtonState;
  actions: ButtonActions;
} {
  // 标记为触发器
  hooks.markAsTrigger();
  // 状态管理
  const hover = hooks.useState<boolean>(false, 'data-hover');
  const focus = hooks.useState<boolean>(false, 'data-focus');
  const focusVisible = hooks.useState<boolean>(false, 'data-focus-visible');
  const active = hooks.useState<boolean>(false, 'data-active');

  const handleDisabledChange = (disabled: boolean) => {
    try {
      const element = hooks.getInstance();
      if (disabled) {
        element.tabIndex = -1;
        element.setAttribute('aria-disabled', 'true');
      } else {
        element.tabIndex = 0;
        element.removeAttribute('aria-disabled');
      }
    } catch (e) {
      // 如果组件还没挂载，就忽略这次更新
      // 等到 mounted 时会重新设置
    }
  };

  // 初始属性处理
  hooks.useMounted(() => {
    const props = hooks.getProps();
    handleDisabledChange(props.disabled ?? false);

    // 自动聚焦
    if (props.autoFocus) {
      const element = hooks.getInstance();
      element.focus();
    }
  });

  // 属性同步
  hooks.onPropsChange(['disabled'], ({ disabled }) => {
    handleDisabledChange(disabled ?? false);
  });

  // 注册事件监听
  // 鼠标悬停
  hooks.useEvent('mouseenter', () => {
    console.log('mouseenter');
    hover.set(true);
  });
  hooks.useEvent('mouseleave', () => hover.set(false));
  // 鼠标按下
  hooks.useEvent('mousedown', () => active.set(true));
  // 鼠标释放
  hooks.useEvent('mouseup', () => active.set(false));
  // 聚焦
  hooks.useEvent('focus', () => {
    focus.set(true);
    focusVisible.set(active.value);
  });
  hooks.useEvent('blur', () => {
    focus.set(false);
    focusVisible.set(false);
  });
  // 点击
  hooks.useEvent('click', (e) => {
    const props = hooks.getProps();
    console.log(props);
    if (!focus.value || props.disabled) return;
    props.onClick?.(e as MouseEvent);
  });
  // 键盘按下
  hooks.useEvent('keydown', (e) => {
    const props = hooks.getProps();
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
        const element = hooks.getInstance();
        element.focus();
      } catch (e) {
        console.warn('Cannot focus button before it is mounted');
      }
    },
    blur() {
      try {
        const element = hooks.getInstance();
        element.blur();
      } catch (e) {
        console.warn('Cannot blur button before it is mounted');
      }
    },
    click() {
      try {
        const props = hooks.getProps();
        if (!props.disabled) {
          const element = hooks.getInstance();
          element.click();
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
