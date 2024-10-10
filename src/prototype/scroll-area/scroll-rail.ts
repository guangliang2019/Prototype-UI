import { ContextProvider } from '@/common';
import {
  DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS,
  PrototypeScrollAreaContext,
  PrototypeScrollRailContext,
  PrototypeScrollRailProps,
} from './interface';

export default class PrototypeScrollRail
  extends ContextProvider<PrototypeScrollRailContext, PrototypeScrollAreaContext>
  implements PrototypeScrollRailProps
{
  protected _providerKeys = new Set(['prototype-scroll-rail']);
  protected _consumerKeys = new Set(['prototype-scroll-area', 'motion-scroll']);

  private _direction: PrototypeScrollRailProps['direction'] =
    DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS['direction'];
  // prettier-ignore
  get direction() { return this._direction; }

  connectedCallback() {
    super.connectedCallback();
    this.style.position = 'absolute';
    this._direction =
      this.getAttribute('direction') === 'horizontal'
        ? 'horizontal'
        : DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS['direction'];

    this.setContext('prototype-scroll-rail', {
      direction: this._direction,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-scroll-rail', PrototypeScrollRail);
