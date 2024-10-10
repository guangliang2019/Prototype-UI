import { ContextConsumer } from '@/common';
import { PrototypeScrollAreaContext } from './interface';

export default class PrototypeScrollContent extends ContextConsumer<PrototypeScrollAreaContext> {
  protected _consumerKeys = ['prototype-scroll-area', 'motion-scroll'];

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['prototype-scroll-area'].contentRef = this;
  }
}

customElements.define('prototype-scroll-content', PrototypeScrollContent);
