import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch, SwitchContext } from '@/core/behaviors/as-switch';
import { ShadcnSwitchProps, SHADCN_SWITCH_DEFAULT_PROPS, ShadcnSwitchContext, ShadcnSwitchContextType } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { ShadcnSwitchThumb } from './switch-thumb';

// 确保 Thumb 组件已注册
if (!customElements.get('shadcn-switch-thumb')) {
  customElements.define('shadcn-switch-thumb', ShadcnSwitchThumb);
}

export const ShadcnSwitchPrototype = definePrototype<ShadcnSwitchProps>({
  name: 'shadcn-switch',
  setup: (p) => {
    // 注入基础 Switch 行为
    const { states } = asSwitch(p);


    p.context.provide(SwitchContext, () => ({
      checked: states.checked,
    }));


    p.context.provide(ShadcnSwitchContext, (updateContext) => {

      const context: ShadcnSwitchContextType = {
        thumbRef: document.createElement('shadcn-switch-thumb'),
        updateRef: (name, ref) => {
         
          const originalRef = context[name];
        
          updateContext({
            [name]: ref,
          });
          // 如果原始引用存在，移除它
          if (originalRef) originalRef.remove();
        },
      };
      return context;
    });



    p.props.define(SHADCN_SWITCH_DEFAULT_PROPS);
 
    p.props.watch(['disabled'], () => p.view.update());

    let _originalCls = '';

    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;

      // 添加点击监听器
      const hostElement = p.view.getElement();
      hostElement.addEventListener('click', () => {
        setTimeout(() => p.view.update(), 10);
      });

      p.view.update();
    });

    return {
      render() {
        const { disabled } = p.props.get();
        const hostElement = p.view.getElement();

     
        const isChecked = hostElement.getAttribute('data-checked') !== null;

       
        const { thumbRef } = p.context.get(ShadcnSwitchContext);
        if (!thumbRef || !hostElement.contains(thumbRef)) {
          const newThumb = document.createElement('shadcn-switch-thumb');
          hostElement.appendChild(newThumb);
        }

        // Switch 样式
        const baseClasses = [
          'inline-flex',
          'items-center',
          'w-14',
          'h-[30px]',
          'relative',
          'rounded-full',
          'transition-colors',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-offset-2'
        ];

        const stateClasses = [
          isChecked ? 'bg-[rgb(250,250,250)]' : 'bg-[rgb(39,39,42)]',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        ];

        const allClasses = [...baseClasses, ...stateClasses, _originalCls].filter(Boolean).join(' ');
        hostElement.className = optimizeTailwindClasses(allClasses);

        if (disabled) {
          hostElement.setAttribute('disabled', '');
        } else {
          hostElement.removeAttribute('disabled');
        }

      },
    };
  },
});

export const ShadcnSwitch = WebComponentAdapter(ShadcnSwitchPrototype);
