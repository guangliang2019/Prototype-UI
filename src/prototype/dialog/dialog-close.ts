import { PrototypeTrigger } from '../trigger';
import { DialogContext } from './interface';

export default class PrototypeDialogClose extends PrototypeTrigger<DialogContext> {
  protected _key = 'prototype-dialog';
}

customElements.define('prototype-dialog-close', PrototypeDialogClose);
