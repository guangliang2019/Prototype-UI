import { PrototypeSelectContext } from './interface';
import { Trigger } from '../../common/trigger';

export default class PrototypeSelectTrigger<
  T extends PrototypeSelectContext = PrototypeSelectContext
> extends Trigger<T> {
  protected _consumerKeys = new Set(['prototype-select']);

  private _handleMouseDown = () => {
    const context = this._contextValues['prototype-select'];
    context.width = this.offsetWidth;
    if (document.activeElement === this) {
      context.width = this.offsetWidth;
      context.selecting ? context.close() : context.open();

      const index = context.items.indexOf(context.value);
      // 这里有些莫名其妙，如果不设置延时，在调用下列 focus 时，会触发当前元素的 _handleFocus 事件
      // 猜测可能是与 open 时 item 刚刚插入进 DOM 树有关
      // 或者是和 mousedown 与 focus 的触发顺序有关
      // prettier-ignore
      if (index !== -1) setTimeout(() => { context.itemsRefs[index].focus(); }, 0);
    }
  };

  private _handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') this._handleFocus();
  };

  private _handleFocus = () => {
    const context = this._contextValues['prototype-select'];
    context.width = this.offsetWidth;
    context.selecting ? context.close() : context.open();

    const index = context.items.indexOf(context.value);
    if (index !== -1) context.itemsRefs[index].focus();
  };

  connectedCallback() {
    super.connectedCallback();
    const context = this._contextValues['prototype-select'];
    context.triggerRef = this;
    context.focus = this.focus.bind(this);

    this.addEventListener('mousedown', this._handleMouseDown);
    this.addEventListener('focus', this._handleFocus);

    this.addEventListener('keydown', this._handleKeydown as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this._handleMouseDown);
    this.removeEventListener('focus', this._handleFocus);
  }
}

customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
