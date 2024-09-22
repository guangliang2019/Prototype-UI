import { SelectContext } from './interface';
import { PrototypeTrigger } from '../trigger';

export default class PrototypeSelectTrigger extends PrototypeTrigger<SelectContext> {
  protected _consumerKey = 'prototype-select';

  private _handleMouseDown = () => {
    this._contextValue.width = this.offsetWidth;
    this._contextValue.selecting ? this._contextValue.close() : this._contextValue.open();
  };

  private _handleFocus = () => {
    this._contextValue.width = this.offsetWidth;
    this._contextValue.open();

    const index = this._contextValue.items.indexOf(this._contextValue.value);
    if (index !== -1) {
      this._contextValue.itemsRefs[index].focus();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.focus = this.focus.bind(this);

    this.addEventListener('mousedown', this._handleMouseDown);
    this.addEventListener('focus', this._handleFocus);
  }

  disconnectedCallback(): void {
    this.removeEventListener('mousedown', this._handleMouseDown);
    this.removeEventListener('focus', this._handleFocus);
  }
}

customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
