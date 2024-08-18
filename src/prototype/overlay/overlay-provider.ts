import { ContextProvider } from '../../common/context-provider';
import { OverlayProviderProps, OverlayContext } from './interface';

export default class PrototypeTab
  extends ContextProvider<OverlayContext>
  implements OverlayProviderProps
{
  constructor() {
    super();
    this._key = 'prototype-overlay';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-tab', PrototypeTab);
