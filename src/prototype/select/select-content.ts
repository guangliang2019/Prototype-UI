import { PrototypeOverlay } from '../overlay';
import { SelectContext } from './interface';

export default class PrototypeSelectContent extends PrototypeOverlay<SelectContext> {
  protected _consumerKey = 'prototype-select';

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.open = this.open.bind(this);
    this._contextValue.close = this.close.bind(this);
  }

  open() {
    if (this._contextValue.selecting) return;
    this.style.width = this._contextValue.width + 'px';
    this._contextValue.selecting = true;
    this._contextValue.rootRef.setAttribute('data-state', 'open');
    super.open();
  }

  close() {
    if (!this._contextValue.selecting) return;
    super.close();
    this._contextValue.rootRef.setAttribute('data-state', 'close');
    this._contextValue.selecting = false;
  }

  onClickOutside = (e: MouseEvent) => {
    if (e.target === this._contextValue.triggerRef) return;
    this.close();
  };
}

customElements.define('prototype-select-content', PrototypeSelectContent);
