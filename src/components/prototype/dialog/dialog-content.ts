import { Overlay } from '@/components/common';
import { DialogContext } from './interface';

export default class PrototypeDialogContent extends Overlay<{
  'prototype-dialog': DialogContext;
}> {
  protected _consumerKey = 'prototype-dialog';
  protected _target = document.body;

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['prototype-dialog'].open = this.open.bind(this);
    this._contextValues['prototype-dialog'].close = this.close.bind(this);
  }
}

customElements.define('prototype-dialog-content', PrototypeDialogContent);
