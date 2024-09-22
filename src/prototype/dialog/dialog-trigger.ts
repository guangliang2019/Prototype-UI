import { PrototypeTrigger } from '../trigger';
import { DialogContext } from './interface';

export default class PrototypeDialogTrigger extends PrototypeTrigger<DialogContext> {
  protected _consumerKey = 'prototype-dialog';
}

customElements.define('prototype-dialog-trigger', PrototypeDialogTrigger);