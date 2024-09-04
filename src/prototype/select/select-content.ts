import { PrototypeOverlay } from '../overlay';
import { SelectContext } from './interface';

export default class PrototypeSelectContent extends PrototypeOverlay<SelectContext> {
  protected _key = 'prototype-select';

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.open = this.open.bind(this);
    this._contextValue.close = this.close.bind(this);
  }

  open() {
    this.style.width = this._contextValue.width + 'px';
    this._contextValue.selecting = true;
    super.open();
  }

  onClickOutside = (_: MouseEvent) => {
    this.close();
    this._contextValue.selecting = false;
  };
}

customElements.define('prototype-select-content', PrototypeSelectContent);
