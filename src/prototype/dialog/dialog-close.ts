import { PrototypeButton } from '../button';
import { DialogContext } from './interface';

export default class PrototypeDialogClose extends PrototypeButton<{
  'prototype-dialog': DialogContext;
}> {
  protected _consumerKeys = new Set(['prototype-dialog']);
  onClick = () => this._contextValues['prototype-dialog'].close();
}

customElements.define('prototype-dialog-close', PrototypeDialogClose);
