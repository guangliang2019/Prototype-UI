import { Trigger } from '@/components/common';
import { TooltipContext } from './interface';

export default class PrototypeTooltipTrigger extends Trigger<{
  'prototype-tooltip': TooltipContext;
}> {
  protected _consumerKeys = ['prototype-tooltip'] as const;
}

customElements.define('prototype-tooltip-trigger', PrototypeTooltipTrigger);
