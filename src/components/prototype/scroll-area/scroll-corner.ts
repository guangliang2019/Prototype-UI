import { ContextConsumer } from '@/components/common';
import { PrototypeScrollAreaContext } from './interface';

export default class PrototypeScrollConner<
  T extends PrototypeScrollAreaContext = PrototypeScrollAreaContext,
> extends ContextConsumer<T> {
  protected _consumerKeys = ['prototype-scroll-area', 'motion-scroll'];

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('prototype-scroll-corner', PrototypeScrollConner);
