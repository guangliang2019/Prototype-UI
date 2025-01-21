import { MotionScroll } from '@/components/motion';
import {
  DEFAULT_PROTOTYPE_SCROLL_AREA_PROPS,
  PrototypeScrollAreaContext,
  PrototypeScrollAreaProps,
} from './interface';
import './style.css';

export default class PrototypeScrollArea<
    T extends PrototypeScrollAreaContext = PrototypeScrollAreaContext,
  >
  extends MotionScroll<T>
  implements PrototypeScrollAreaProps
{
  protected _providerKeys = ['prototype-scroll-area', 'motion-scroll'];

  hideDelay = DEFAULT_PROTOTYPE_SCROLL_AREA_PROPS['hideDelay'];
  alwaysShowScrollbar = DEFAULT_PROTOTYPE_SCROLL_AREA_PROPS['alwaysShowScrollbar'];

  static get observedAttributes() {
    return ['hideDelay', 'alwaysShowScrollbar'];
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    const mapping: Record<string, any> = {
      'hideDelay': () => {
        this.hideDelay = Number(newValue);
        this.setContext('prototype-scroll-area', {
          hideDelay: this.hideDelay,
        } as Partial<T['prototype-scroll-area']>);
      },
      'alwaysShowScrollbar': () => {
        this.alwaysShowScrollbar = Boolean(newValue);
        this.setContext('prototype-scroll-area', {
          alwaysShowScrollbar: this.alwaysShowScrollbar,
        } as Partial<T['prototype-scroll-area']>);
        if (this.alwaysShowScrollbar) {
          this._provideValues['prototype-scroll-area'].show();
        }
      },
    };
    mapping[name]?.();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setContext('prototype-scroll-area', {
      hideDelay: this.hideDelay,
      alwaysShowScrollbar: this.alwaysShowScrollbar,
    } as Partial<T['prototype-scroll-area']>);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-scroll-area', PrototypeScrollArea);
