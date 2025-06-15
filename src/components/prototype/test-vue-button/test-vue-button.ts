import { definePrototype, WebComponentAdapter } from '@/core';
import { asButton, ButtonExposes } from '@/core/behaviors/as-button';
import { TestButtonProps } from './interface';

import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { VueAdapter } from '@/core/adapters/web/@vue/index';
import { CONFIG } from '@/components/testvue/_config';

export const TestVueButtonPrototype = definePrototype<TestButtonProps, ButtonExposes>({
  name: `${CONFIG.shadcn.prefix}-button`,
  setup: (p) => {
    // role
    // asButton(p);

    // props
    p.props.define({ variant: 'secondary', iconOnly: false });
    p.props.watch(['variant'], () => p.view.update());

    // handle class names
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });
    console.log('TestVueButtonPrototype', );
    return () => {
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
      // prettier-ignore
      const _computedClass = [basicCls, flexCls, shapeCls, sizeCls, cursorCls, fontCls, animationCls, disabledCls, focusCls, shadowCls, colorCls, borderCls, extraCls].join(' ').trimEnd();
      p.view.getElement().className = optimizeTailwindClasses(
        [_computedClass, _originalCls].join(' ').trimEnd()
      );
    };
  },
});

export const TestVueButton = VueAdapter(TestVueButtonPrototype);
