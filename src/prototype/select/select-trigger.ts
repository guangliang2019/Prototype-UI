import { SelectContext } from './interface';
import { PrototypeTrigger } from '../trigger';

export default class PrototypeSelectTrigger extends PrototypeTrigger<SelectContext> {
  protected _key = 'prototype-select';

  private _handleMouseDown = () => {
    this._contextValue.width = this.offsetWidth;
    this._contextValue.selecting ? this._contextValue.close() : this._contextValue.open();
  };

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.focus = this.focus.bind(this);

    this.addEventListener('mousedown', this._handleMouseDown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('mousedown', this._handleMouseDown);
    // super.disconnectedCallback();
  }
}

customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
