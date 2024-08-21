import { PrototypeButton } from '../../prototype/button';
import { ShacnButtonProps, SHADCN_BUTTON_DEFAULT_PROPS } from './interface';

export default class ShadcnButton<T extends Object = {}>
  extends PrototypeButton<T>
  implements ShacnButtonProps
{
  private _iconOnly = SHADCN_BUTTON_DEFAULT_PROPS['iconOnly'];
  private _variant = SHADCN_BUTTON_DEFAULT_PROPS['variant'];

  static get observedAttributes() {
    return [...super.observedAttributes, 'icon-only'];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
    const mapping: Record<string, any> = {
      'icon-only': () => (this._iconOnly = newValue !== null),
    };

    mapping[name]?.();

    // 响应式属性变化进行重新渲染，onClick 变化不会重新渲染
    if (oldValue !== newValue) {
      if (name === 'variant' || name === 'icon-only' || name === 'disabled') {
        this._render();
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._variant =
      (this.getAttribute('variant') as ShacnButtonProps['variant']) ||
      SHADCN_BUTTON_DEFAULT_PROPS['variant'];
    this._iconOnly = this.hasAttribute('icon-only');
    this._render();
  }

  private _render() {
    let basicCls = 'select-none whitespace-nowrap';
    let flexCls = 'inline-flex items-center justify-center gap-2';
    let shapeCls = 'rounded-md';
    let sizeCls = this._iconOnly ? 'h-9 w-9' : 'h-9 px-4 py-2';
    let cursorCls = this.disabled ? 'cursor-arrow' : 'cursor-pointer';
    let fontCls = 'text-sm font-medium';
    let animationCls = 'transition-colors';
    let disabledCls = 'disabled:pointer-events-none disabled:opacity-50';
    let colorCls = 'bg-secondary text-secondary-foreground  hover:bg-secondary/80';
    let focusCls = 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
    let shadowCls = 'shadow-sm';
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
        colorCls = 'bg-destructive text-destructive-foregroundhover:bg-destructive/90';
        break;
      case 'ghost':
        colorCls = 'hover:bg-accent hover:text-accent-foreground';
      case 'link':
        extraCls = 'text-primary underline-offset-4 hover:underline';
        break;
    }
    // prettier-ignore
    this.className = [basicCls, flexCls, shapeCls, sizeCls, cursorCls, fontCls, animationCls, disabledCls, colorCls, focusCls, shadowCls, borderCls, extraCls].join(' ');
  }
}

customElements.define('shadcn-button', ShadcnButton);
