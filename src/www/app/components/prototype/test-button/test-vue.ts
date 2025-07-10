import { definePrototype } from '@/core';
import VueAdapter from '@/core/adapters/web/@next-vue';
import {
  ButtonState,
  ButtonExposes,
  ButtonProps,
  DEFAULT_BUTTON_PROPS,
} from '@/core/behaviors/as-button';
import { defineComponent, h, ref, onMounted } from 'vue';
import { ShadcnButtonProps } from '@/components/shadcn/button/interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { CONFIG } from '@/components/shadcn/_config';

import { PrototypeAPI } from '@/core/interface';
// 定义组件的 props 接口
interface TestVueProps {
  value?: string;
  name?: string;
}

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

  return {
    states: {
      hover,
      focus,
      focusVisible,
      active,
    },
  };
};

const PrototypeButton = definePrototype<ShadcnButtonProps, ButtonExposes>({
  name: `vue-button`,
  setup: (p) => {
    // role
    asButton(p);

    // props
    p.props.define({ variant: 'secondary', iconOnly: false });
    p.props.watch(['variant'], () => {
      p.view.update();
    });

    // handle class names
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return (renderer) => {
      const r = renderer.createElement;
      const { iconOnly, disabled, variant } = p.props.get();
      let basicCls = 'select-none whitespace-nowrap';
      let flexCls = 'inline-flex items-center justify-center gap-2';
      let shapeCls = 'rounded-md';
      let sizeCls = iconOnly ? 'h-9 w-9' : 'h-9 px-4 py-2';
      let cursorCls = disabled ? 'cursor-arrow' : 'cursor-pointer';
      let fontCls = 'text-sm font-medium';
      let animationCls = 'transition-colors';
      let disabledCls = 'disabled:pointer-events-none disabled:opacity-50';
      let focusCls = 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
      let shadowCls = 'shadow-sm';
      let colorCls = 'bg-secondary text-secondary-foreground  hover:bg-secondary/80';
      let borderCls = '';
      let extraCls = '';
      switch (variant) {
        case 'primary':
          colorCls = 'bg-primary text-primary-foreground hover:bg-primary/90';
          shadowCls = 'shadow-lg';
          break;
        case 'secondary':
          break;
        case 'outline':
          colorCls = 'bg-background hover:bg-accent hover:text-accent-foreground';
          borderCls = 'border border-input';
          break;
        case 'destructive':
          colorCls = 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
          break;
        case 'ghost':
          colorCls = 'hover:bg-accent hover:text-accent-foreground';
          break;
        case 'link':
          extraCls = 'text-primary underline-offset-4 hover:underline';
          colorCls = '';
          break;
      }
      const _computedClass = [
        basicCls,
        flexCls,
        shapeCls,
        sizeCls,
        cursorCls,
        fontCls,
        animationCls,
        disabledCls,
        focusCls,
        shadowCls,
        colorCls,
        borderCls,
        extraCls,
      ]
        .join(' ')
        .trimEnd();
      p.view.getElement().className = optimizeTailwindClasses(
        [_computedClass, _originalCls].join(' ').trimEnd()
      );

      return 'Button1';
    };
  },
});
const vueButton = VueAdapter(PrototypeButton);

const TestVueComponent = defineComponent({
  setup() {
    // 测试生命周期
    onMounted(() => {
      console.log('Vue 组件已挂载');
    });
    // TODO: 要想办法得到这里的button才行不然没办法得到
    return () =>
      h('div', { class: 'space-y-4 p-4' }, [
        // h(testPrototype, { value: '123', name: '123' }),
        h(vueButton, { variant: 'link' }, ['button','123']),
      ]);
  },
});

export default TestVueComponent;
