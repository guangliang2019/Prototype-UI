import { PrototypeSelectContent } from '@/prototype/select';

export default class ShadcnSelectContent extends PrototypeSelectContent {
  private _class = '';
  private _computedClass = '';

  connectedCallback() {
    super.connectedCallback();
    this._render();
  }

  private _render() {
    const flexCls = 'flex flex-col items-start';
    const positionCls = 'relative z-50 top-1';
    const sizeCls = 'max-h-96 min-w-[8rem] p-1';
    const shapeCls = 'rounded-md shadow-md';
    const borderCls = 'border';
    const colorCls = 'bg-popover text-popover-foreground';
    // prettier-ignore
    const otherCls = 'overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1';

    // prettier-ignore
    this._computedClass = [flexCls, positionCls, sizeCls, shapeCls, borderCls, colorCls, otherCls].join(' ').trimEnd();
    this._computedClass = this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select-content', ShadcnSelectContent);
