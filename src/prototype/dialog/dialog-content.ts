import { PrototypeOverlay } from '../overlay';
import { DialogContext } from './interface';

export default class PrototypeDialogContent extends PrototypeOverlay<DialogContext> {
  protected _consumerKey = 'prototype-dialog';
  protected _target = document.body;

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.open = this.open.bind(this);
    this._contextValue.close = this.close.bind(this);
  }
}

customElements.define('prototype-dialog-content', PrototypeDialogContent);
