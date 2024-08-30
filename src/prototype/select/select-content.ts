import { PrototypeOverlay } from '../overlay';
import { SelectContext } from './interface';

export default class PrototypeSelectContent extends PrototypeOverlay<SelectContext> {
  protected _key = 'prototype-select';

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.oepn = this.oepn.bind(this);
    this._contextValue.close = this.close.bind(this);
  }
}

customElements.define('prototype-select-content', PrototypeSelectContent);
