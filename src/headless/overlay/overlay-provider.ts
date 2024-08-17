import { ContextProvider } from '../../common/context-provider';
import { OverlayProviderProps, OverlayContext } from './interface';

export default class HeadlessTab
  extends ContextProvider<OverlayContext>
  implements OverlayProviderProps
{
  constructor() {
    super();
    this._key = 'headless-overlay';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('headless-tab', HeadlessTab);
