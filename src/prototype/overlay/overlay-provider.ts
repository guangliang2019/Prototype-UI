import { ContextProvider } from '../../common/context';
import { OverlayProviderProps, OverlayContext } from './interface';

export default class PrototypeTab
  extends ContextProvider<OverlayContext>
  implements OverlayProviderProps
{
  protected _key = 'prototype-overlay';
}

customElements.define('prototype-tab', PrototypeTab);
