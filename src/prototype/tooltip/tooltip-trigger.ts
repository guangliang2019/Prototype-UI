import { PrototypeTrigger } from '../trigger';
import { TooltipContext } from './interface';

export default class PrototypeTooltipTrigger extends PrototypeTrigger<TooltipContext> {
  protected _key = 'prototype-tooltip';
}

customElements.define('prototype-tooltip-trigger', PrototypeTooltipTrigger);
