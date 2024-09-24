import { Trigger } from '../../common/trigger';
import { TooltipContext } from './interface';

export default class PrototypeTooltipTrigger extends Trigger<TooltipContext> {
  protected _consumerKey = 'prototype-tooltip';
}

customElements.define('prototype-tooltip-trigger', PrototypeTooltipTrigger);
