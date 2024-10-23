import { ContextProvider } from '@/common';
import {
  DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS,
  PrototypeScrollAreaContext,
  PrototypeScrollRailContext,
  PrototypeScrollRailProps,
} from './interface';

export default class PrototypeScrollRail<
    ProvideType extends PrototypeScrollRailContext = PrototypeScrollRailContext,
    ConsumeType extends PrototypeScrollAreaContext = PrototypeScrollAreaContext,
  >
  extends ContextProvider<ProvideType, ConsumeType>
  implements PrototypeScrollRailProps
{
  protected _providerKeys = ['prototype-scroll-rail'];
  protected _consumerKeys = ['prototype-scroll-area', 'motion-scroll'];

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
    } as Partial<ProvideType['prototype-scroll-rail']>);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-scroll-rail', PrototypeScrollRail);
