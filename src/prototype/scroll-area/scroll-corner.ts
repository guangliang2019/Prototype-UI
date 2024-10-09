import { ContextConsumer } from '@/common';
import { PrototypeScrollAreaContext } from './interface';

export default class PrototypeScrollConner extends ContextConsumer<PrototypeScrollAreaContext> {
  protected _consumerKeys = new Set(['prototype-scroll-area', 'motion-scroll']);

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('prototype-scroll-corner', PrototypeScrollConner);