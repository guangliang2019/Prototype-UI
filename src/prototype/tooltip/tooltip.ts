import { ContextProvider } from '@/common';
import { TooltipContext } from './interface';

export default class PrototypeTooltip extends ContextProvider<TooltipContext> {
  protected _key = 'prototype-tooltip';
}
