import { Trigger } from '../../common/trigger';
import { DialogContext } from './interface';

export default class PrototypeDialogTrigger extends Trigger<{
  'prototype-dialog-open': DialogContext;
}> {
  protected _consumerKey = 'prototype-dialog';
}

customElements.define('prototype-dialog-trigger', PrototypeDialogTrigger);
