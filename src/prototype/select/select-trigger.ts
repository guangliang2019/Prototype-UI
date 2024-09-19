import { SelectContext } from './interface';
import { PrototypeTrigger } from '../trigger';

export default class PrototypeSelectTrigger extends PrototypeTrigger<SelectContext> {
  protected _key = 'prototype-select';

  private _justOpend = false;

  private _handleMouseDown = () => {
    this._contextValue.width = this.offsetWidth;
    this._contextValue.selecting ? this._contextValue.close() : this._contextValue.open();
    this._justOpend = true;
  };

  private _handleFocus = () => {
    this._contextValue.width = this.offsetWidth;
    this._contextValue.open();
    this._justOpend = true;
  };

  private _handleBlur = () => {
    if (this._justOpend) {
      this._justOpend = false;
      return;
    }
    this._contextValue.close();
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
