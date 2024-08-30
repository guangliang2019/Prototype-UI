import { PrototypeOverlay } from '../overlay';
import { TooltipContext } from './interface';

export default class PrototypeTooltipContent extends PrototypeOverlay<TooltipContext> {
  protected _key = 'prototype-tooltip';
}
