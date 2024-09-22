import { PrototypeOverlay } from '../overlay';
import { TooltipContext } from './interface';

export default class PrototypeTooltipContent extends PrototypeOverlay<TooltipContext> {
  protected _consumerKey = 'prototype-tooltip';

  connectedCallback() {
    super.connectedCallback();

    this._contextValue.open = this.open.bind(this);
    this._contextValue.close = this.close.bind(this);
  }
}
