import { PrototypeSelectContent } from '@/components/prototype/select';
import { ShadcnSelectContext } from './interface';

export default class ShadcnSelectContent extends PrototypeSelectContent<ShadcnSelectContext> {
  protected _consumerKeys = ['shadcn-select', 'prototype-select'];

  private _class = '';
  private _computedClass = '';

  connectedCallback() {
    super.connectedCallback();
    this._setup();
  }

  private _setup() {
    const flexCls = 'flex flex-col items-start';
    const positionCls = 'relative z-50 top-1';
    const sizeCls = 'max-h-96 min-w-[8rem] p-1';
    const shapeCls = 'rounded-md shadow-md';
    const borderCls = 'border';
    const colorCls = 'bg-popover text-popover-foreground';
    const otherCls = 'popover-animated-in overflow-hidden';

    // prettier-ignore
    this._computedClass = [flexCls, positionCls, sizeCls, shapeCls, borderCls, colorCls, otherCls].join(' ').trimEnd();
    this._computedClass = this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select-content', ShadcnSelectContent);
