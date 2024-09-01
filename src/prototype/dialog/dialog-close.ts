import { PrototypeButton } from '../button';
import { DialogContext } from './interface';

export default class PrototypeDialogClose extends PrototypeButton<DialogContext> {
  protected _key = 'prototype-dialog';
  onClick = () => this._contextValue.close();
}

customElements.define('prototype-dialog-close', PrototypeDialogClose);
