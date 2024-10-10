import { ContextProvider } from '@/common';
import { TooltipContext } from './interface';

export default class PrototypeTooltip extends ContextProvider<{
  'prototype-tooltip': TooltipContext;
}> {
  protected _providerKeys =(['prototype-tooltip'] as const);
}
