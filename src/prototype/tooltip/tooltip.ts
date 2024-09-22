import { ContextProvider } from '@/common';
import { TooltipContext } from './interface';

export default class PrototypeTooltip extends ContextProvider<TooltipContext> {
  protected _consumerKey = 'prototype-tooltip';
  protected _providerKey = 'prototype-tooltip';
}
