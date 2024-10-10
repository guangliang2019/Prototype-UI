import { PrototypeOverlay } from '../overlay';
import { TooltipContext } from './interface';

export default class PrototypeTooltipContent extends PrototypeOverlay<{
  'prototype-tooltip': TooltipContext;
}> {
  protected _consumerKeys =(['prototype-tooltip'] as const);

  connectedCallback() {
    super.connectedCallback();

    const context = this._contextValues['prototype-tooltip'];
    context.open = this.open.bind(this);
    context.close = this.close.bind(this);
  }
}
