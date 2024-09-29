import { PrototypeOverlay } from '../overlay';
import { SelectContext } from './interface';

export default class PrototypeSelectContent extends PrototypeOverlay<{
  'prototype-select': SelectContext;
}> {
  protected _consumerKeys = new Set(['prototype-select'] as const);

  connectedCallback() {
    super.connectedCallback();
    const context = this._contextValues['prototype-select'];
    context.open = this.open.bind(this);
    context.close = this.close.bind(this);
  }

  open() {
    const context = this._contextValues['prototype-select'];
    if (context.selecting) return;
    this.style.width = context.width + 'px';
    context.selecting = true;
    context.rootRef.setAttribute('data-state', 'open');
    super.open();
  }

  close() {
    const context = this._contextValues['prototype-select'];
    if (!context.selecting) return;
    super.close();
    context.rootRef.setAttribute('data-state', 'close');
    context.selecting = false;
  }

  onClickOutside = (e: MouseEvent) => {
    const context = this._contextValues['prototype-select'];
    if (e.target === context.triggerRef) return;
    this.close();
  };
}

customElements.define('prototype-select-content', PrototypeSelectContent);
