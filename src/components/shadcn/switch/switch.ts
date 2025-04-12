import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch, SwitchState } from '@/core/behaviors/as-switch';
import { ShadcnSwitchProps, SHADCN_SWITCH_DEFAULT_PROPS } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';

export const ShadcnSwitchPrototype = definePrototype<ShadcnSwitchProps>({
  name: 'shadcn-switch',
  setup: (p) => {
    // 注入基础 Switch 行为
    const { states } = asSwitch(p);

    // 定义 Props 及其默认值
    p.props.define(SHADCN_SWITCH_DEFAULT_PROPS);

    // 监听会影响样式的 Props
    p.props.watch(['disabled'], () => p.view.update());

    let _originalCls = '';
    let thumbElement: HTMLSpanElement | null = null;
    let observer: MutationObserver | null = null;

    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
      const hostElement = p.view.getElement();

      // 设置初始样式
      hostElement.style.width = '56px';
      hostElement.style.height = '30px';
      hostElement.style.display = 'inline-flex';
      hostElement.style.alignItems = 'center';
      hostElement.style.position = 'relative';

      // 创建滑块元素
      thumbElement = document.createElement('span');
      hostElement.appendChild(thumbElement);

      // 使用 MutationObserver 监听 data-checked 属性变化
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-checked') {
            console.log(`data-checked 属性变化，从 ${mutation.oldValue} 变为 ${hostElement.getAttribute('data-checked')}`);
            p.view.update();
          }
        });
      });

      observer.observe(hostElement, {
        attributes: true,
        attributeFilter: ['data-checked'],
        attributeOldValue: true
      });

      // 初始渲染
      p.view.update();
    });

    // 清理观察器
    p.lifecycle.onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    });

    return {
      render() {
        const { disabled } = p.props.get();
        const hostElement = p.view.getElement();

        const dataChecked = hostElement.getAttribute('data-checked');
        const isChecked = dataChecked !== null;

        // 设置宿主元素样式
        hostElement.style.width = '56px';
        hostElement.style.height = '30px';
        hostElement.style.display = 'inline-flex';
        hostElement.style.alignItems = 'center';
        hostElement.style.position = 'relative';
        hostElement.style.borderRadius = '9999px';
        hostElement.style.cursor = disabled ? 'not-allowed' : 'pointer';

        hostElement.style.backgroundColor = isChecked ? 'rgb(250, 250, 250)' : 'rgb(39, 39, 42)';
        hostElement.style.transition = 'background-color 0.2s ease';


        const focusClasses = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
        hostElement.className = `${focusClasses} ${_originalCls || ''}`.trim();

        if (disabled) {
          hostElement.style.opacity = '0.5';
        } else {
          hostElement.style.opacity = '1';
        }


        if (thumbElement) {
          const thumbSize = 26;
          const verticalOffset = (30 - thumbSize) / 2;
          thumbElement.style.position = 'absolute';
          thumbElement.style.top = `${verticalOffset}px`;
          thumbElement.style.left = '2px';
          thumbElement.style.width = `${thumbSize}px`;
          thumbElement.style.height = `${thumbSize}px`;
          thumbElement.style.borderRadius = '9999px';
          thumbElement.style.backgroundColor = 'rgb(9, 9, 11)';
          thumbElement.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';


          const moveDistance = 56 - thumbSize - 4;
          thumbElement.style.transform = isChecked ? `translateX(${moveDistance}px)` : 'translateX(0)';

          thumbElement.style.transition = 'transform 0.2s ease';
          thumbElement.style.zIndex = '2';
          thumbElement.style.pointerEvents = 'none';
        }
      },
    };
  },
});

export const ShadcnSwitch = WebComponentAdapter(ShadcnSwitchPrototype);
