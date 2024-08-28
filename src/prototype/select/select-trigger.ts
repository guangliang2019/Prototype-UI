import { SelectContext } from './interface';
import { PrototypeButton } from '../button';

export default class PrototypeSelectTrigger extends PrototypeButton<SelectContext> {
  protected _key = 'prototype-select';

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.focus = this.focus.bind(this);

    this.onClick = () =>
      this._contextValue.selecting ? this._contextValue.close() : this._contextValue.show();
  }
}

customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
