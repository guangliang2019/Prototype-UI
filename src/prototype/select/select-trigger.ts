import { SelectContext } from './interface';
import { PrototypeTrigger } from '../trigger';

export default class PrototypeSelectTrigger extends PrototypeTrigger<SelectContext> {
  protected _consumerKey = 'prototype-select';

  private _handleMouseDown = () => {
    this._contextValue.width = this.offsetWidth;
    if (document.activeElement === this) {
      this._contextValue.width = this.offsetWidth;
      this._contextValue.selecting ? this._contextValue.close() : this._contextValue.open();

      const index = this._contextValue.items.indexOf(this._contextValue.value);
      // 这里有些莫名其妙，如果不设置延时，在调用下列 focus 时，会触发当前元素的 _handleFocus 事件
      // 猜测可能是与 open 时 item 刚刚插入进 DOM 树有关
      // 或者是和 mousedown 与 focus 的触发顺序有关
      // prettier-ignore
      if (index !== -1) setTimeout(() => { this._contextValue.itemsRefs[index].focus(); }, 0);
    }
  };

  private _handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') this._handleFocus();
  };

  private _handleFocus = () => {
    this._contextValue.width = this.offsetWidth;
    this._contextValue.selecting ? this._contextValue.close() : this._contextValue.open();

    const index = this._contextValue.items.indexOf(this._contextValue.value);
    if (index !== -1) this._contextValue.itemsRefs[index].focus();
  };

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.triggerRef = this;
    this._contextValue.focus = this.focus.bind(this);

    this.addEventListener('mousedown', this._handleMouseDown);
    this.addEventListener('focus', this._handleFocus);

    this.addEventListener('keydown', this._handleKeydown as EventListener);
  }

  disconnectedCallback(): void {
    this.removeEventListener('mousedown', this._handleMouseDown);
    this.removeEventListener('focus', this._handleFocus);
  }
}

customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
