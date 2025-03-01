import { ShadcnButtonProps, SHADCN_BUTTON_DEFAULT_PROPS } from './interface';
import { CONFIG } from '../_config';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { definePrototype } from '@/core';
import { defineProps, useConnect, useDisconnect } from '@/core/lifecycle';
import { requestRender } from '@/core/render';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { asButton } from '@/core/components/button';

const Button = definePrototype<ShadcnButtonProps>((p) => {
  // role
  asButton(p);
  // props
  defineProps(p, { variant: 'secondary', iconOnly: false }, (key, _) => {
    if (key === 'variant') requestRender(p);
  });

  let _originalCls = '';
  useConnect(p, () => {
    _originalCls = p.componentRef.className;
  });

  return () => {
    const component = p.componentRef;
    const { iconOnly, disabled, variant } = component;

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
    component.className = optimizeTailwindClasses(
      [_computedClass, _originalCls].join(' ').trimEnd()
    );

    return null;
  };
});

const ShadcnButton = WebComponentAdapter(Button);
export default ShadcnButton;

customElements.define(`${CONFIG.shadcn.prefix}-button`, ShadcnButton);
