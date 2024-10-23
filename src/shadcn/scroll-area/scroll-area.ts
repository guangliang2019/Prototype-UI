import { PrototypeScrollArea } from '@/prototype/scroll-area';
import { ShadcnScrollAreaContext } from './interface';

export default class ShadcnScrollArea extends PrototypeScrollArea<ShadcnScrollAreaContext> {
  protected _providerKeys = ['prototype-scroll-area', 'motion-scroll', 'shadcn-scroll-area'];

  private _setup() {}
}

customElements.define('shadcn-scroll-area', ShadcnScrollArea);
