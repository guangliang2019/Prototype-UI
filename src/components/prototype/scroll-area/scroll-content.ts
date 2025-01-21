import { ContextConsumer } from '@/components/common';
import { PrototypeScrollAreaContext } from './interface';

export default class PrototypeScrollContent<
  T extends PrototypeScrollAreaContext = PrototypeScrollAreaContext,
> extends ContextConsumer<T> {
  protected _consumerKeys = ['prototype-scroll-area', 'motion-scroll'];

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['prototype-scroll-area'].contentRef = this;
  }
}

customElements.define('prototype-scroll-content', PrototypeScrollContent);
