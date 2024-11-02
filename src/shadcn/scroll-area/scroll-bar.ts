import { PrototypeScrollRail, PrototypeScrollRailContext } from '@/prototype/scroll-area';
import { ShadcnScrollAreaContext } from './interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import './scroll-thumb';

export default class ShadcnScrollBar extends PrototypeScrollRail<
  PrototypeScrollRailContext,
  ShadcnScrollAreaContext
> {
  protected _providerKeys = ['prototype-scroll-rail', 'shadcn-scroll-bar'];
  protected _consumerKeys = ['prototype-scroll-area', 'motion-scroll', 'shadcn-scroll-area'];
  private _thumbRef = document.createElement('shadcn-scroll-thumb');

  // 用户添加的 class 属性
  private _class = '';
  // 组件自身的 class 属性
  private _computedClass = '';

  connectedCallback() {
    super.connectedCallback();
    this.direction === 'vertical'
      ? (this._contextValues['shadcn-scroll-area'].verticalScrollBarRef = this)
      : (this._contextValues['shadcn-scroll-area'].horizontalScrollBarRef = this);
    this._setup();
  }

  private _setup() {
    if (!this.contains(this._thumbRef)) this.appendChild(this._thumbRef);
    const positionCls = `absolute ${this.direction === 'vertical' ? 'right-0' : 'bottom-0'}`;
    const sizeCls = `${this.direction === 'vertical' ? 'h-full w-2' : 'w-full h-2'}`;
    let otherCls = ""

    // prettier-ignore
    this._computedClass = [positionCls, sizeCls, otherCls].join(' ').trimEnd();
    this.className = optimizeTailwindClasses(
      [this._computedClass, this._class].join(' ').trimEnd()
    );
  }
}

customElements.define('shadcn-scroll-bar', ShadcnScrollBar);
