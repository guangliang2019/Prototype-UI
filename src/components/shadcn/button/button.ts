import { PrototypeButton } from '@/components/prototype/button';
import { ShadcnButtonProps, SHADCN_BUTTON_DEFAULT_PROPS } from './interface';
import { CONFIG } from '../_config';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';

export default class ShadcnButton<T extends Record<string, Object> = {}>
  extends PrototypeButton<T>
  implements ShadcnButtonProps
{
  private _iconOnly = SHADCN_BUTTON_DEFAULT_PROPS['iconOnly'];
  private _variant = SHADCN_BUTTON_DEFAULT_PROPS['variant'];
  // 用户添加的 class 属性
  private _class = '';
  // 组件自身的 class 属性
  private _computedClass = '';

  static get observedAttributes() {
    return [...super.observedAttributes, 'variant', 'icon-only'];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
    const mapping: Record<string, any> = {
      'variant': () => (this._variant = newValue),
      'icon-only': () => (this._iconOnly = newValue !== null),
    };

    mapping[name]?.();

    // 响应式属性变化进行重新渲染 (初始化时不会触发), onClick 变化不会重新渲染,
    if (oldValue !== newValue && oldValue !== null) {
      if (name === 'variant' || name === 'icon-only' || name === 'disabled') {
        this._setup();
      }
    }
  }

  connectedCallback() {
    this._class = this.className || '';
    super.connectedCallback();

    this._variant =
      (this.getAttribute('variant') as ShadcnButtonProps['variant']) ||
      SHADCN_BUTTON_DEFAULT_PROPS['variant'];
    this._iconOnly = this.hasAttribute('icon-only');
    this._setup();
  }

  private _setup() {
    let basicCls = 'select-none whitespace-nowrap';
    let flexCls = 'inline-flex items-center justify-center gap-2';
    let shapeCls = 'rounded-md';
    let sizeCls = this._iconOnly ? 'h-9 w-9' : 'h-9 px-4 py-2';
    let cursorCls = this.disabled ? 'cursor-arrow' : 'cursor-pointer';
    let fontCls = 'text-sm font-medium';
    let animationCls = 'transition-colors';
    let disabledCls = 'disabled:pointer-events-none disabled:opacity-50';
    let focusCls = 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
    let shadowCls = 'shadow-sm';
    let colorCls = 'bg-secondary text-secondary-foreground  hover:bg-secondary/80';
    let borderCls = '';
    let extraCls = '';

    switch (this._variant) {
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
    this._computedClass = [basicCls, flexCls, shapeCls, sizeCls, cursorCls, fontCls, animationCls, disabledCls, focusCls, shadowCls, colorCls, borderCls, extraCls].join(' ').trimEnd();
    this.className = optimizeTailwindClasses(
      [this._computedClass, this._class].join(' ').trimEnd()
    );
  }
}

customElements.define(`${CONFIG.shadcn.prefix}-button`, ShadcnButton);
