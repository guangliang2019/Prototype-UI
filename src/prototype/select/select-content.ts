import { PrototypeOverlay } from '../overlay';
import { PrototypeSelectContext } from './interface';

export default class PrototypeSelectContent<
  T extends PrototypeSelectContext = PrototypeSelectContext,
> extends PrototypeOverlay<T> {
  protected _consumerKeys = ['prototype-select'];

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['prototype-select'].contentRef = this;
    const context = this._contextValues['prototype-select'];
    context.open = this.open.bind(this);
    context.close = this.close.bind(this);
  }

  open() {
    const context = this._contextValues['prototype-select'];
    if (context.selecting) return;
    this.style.width = context.width + 'px';
    context.selecting = true;
    context.rootRef.setAttribute('data-state', 'open');
    super.open();
  }

  close() {
    const context = this._contextValues['prototype-select'];
    if (!context.selecting) return;
    super.close();
    context.rootRef.setAttribute('data-state', 'close');
    context.triggerRef.focus();
    // Return focus to the trigger
    context.selecting = false;
  }

  onClickOutside = (e: MouseEvent) => {
    const context = this._contextValues['prototype-select'];
    if (e.target === context.triggerRef) return;
    this.close();
  };
}

customElements.define('prototype-select-content', PrototypeSelectContent);
