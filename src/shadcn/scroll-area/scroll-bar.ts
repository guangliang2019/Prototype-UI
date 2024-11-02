import { PrototypeScrollRail, PrototypeScrollRailContext } from '@/prototype/scroll-area';
import { ShadcnScrollAreaContext } from './interface';

export default class ShadcnScrollBar extends PrototypeScrollRail<
  PrototypeScrollRailContext,
  ShadcnScrollAreaContext
> {
  protected _consumerKeys = ['prototype-scroll-area', 'motion-scroll', 'shadcn-scroll-area'];
  private _thumbRef = document.createElement('prototype-scroll-thumb');

  connectedCallback() {
    super.connectedCallback();
    this.direction === 'vertical'
      ? (this._contextValues['shadcn-scroll-area'].verticalScrollBarRef = this)
      : (this._contextValues['shadcn-scroll-area'].horizontalScrollBarRef = this);
    this._setup();
  }

  private _setup() {
    if (!this.contains(this._thumbRef)) this.appendChild(this._thumbRef);
  }
}
