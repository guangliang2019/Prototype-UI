import { ContextConsumer } from '../../common';
import { ButtonProps } from './interface';

export default class PrototypeButton<T extends Object>
  extends ContextConsumer<T>
  implements ButtonProps
{
  protected _key = 'prototype-button';
  /**
   * disable，响应式属性，有自定义的 getter 与 setter
   */
  private _disable = false;
  // prettier-ignore
  get disable () { return this._disable; }
  private _handleDisableChange(newValue: boolean) {
    this._disable = newValue;
    if (newValue) {
      this.tabIndex = -1;
    } else {
      this.tabIndex = 0;
    }
  }
  // prettier-ignore
  set disable(value) { this._handleDisableChange(value); }

  /**
   * hover，私有属性，私有成员 _hover 为 true 时，元素自动添加 data-hover 属性
   */
  private _hover = false;
  private _handleHoverChange(newValue: boolean) {
    this._hover = newValue;
    this._hover ? this.setAttribute('data-hover', '') : this.removeAttribute('data-hover');
  }
  private _handleMouseEnter = () => this._handleHoverChange(true);
  private _handleMouseLeave = () => this._handleHoverChange(false);

  /**
   * focus，私有属性，私有成员 _focus 为 true 时，元素自动添加 data-focus 属性
   */
  private _focus = false;
  private _handleFocusChange(newValue: boolean) {
    this._focus = newValue;
    this._focus ? this.setAttribute('data-focus', '') : this.removeAttribute('data-focus');
  }
  private _handleFocus = () => this._handleFocusChange(true);
  private _handleBlur = () => this._handleFocusChange(false);

  /**
   * active，私有属性，私有成员 _active 为 true 时，元素自动添加 data-active 属性
   */
  private _active = false;
  private _handleActiveChange(newValue: boolean) {
    this._active = newValue;
    this._active ? this.setAttribute('data-active', '') : this.removeAttribute('data-active');
  }
  private _handleActive = () => this._handleActiveChange(true);
  private _handleInactive = () => this._handleActiveChange(false);

  /**
   * autoFocus，只读属性，私有成员 _autoFocus 为 true 时，元素在首次渲染时自动获得焦点
   */
  private _autoFocus = false;
  // prettier-ignore
  get autoFocus() { return this._autoFocus; }

  /**
   * onClick，响应式属性，按钮的点击事件，实际上键盘也能触发
   */
  onClick: () => void = () => {};

  constructor() {
    super();
    this.tabIndex = 0;
  }

  private _handleEnterKeyDown = (e: KeyboardEvent) => {
    if (this.disable) return;
    if (e.key === 'Enter') {
      // 触发一瞬间的 active 与 inactive 事件
      this._handleActive();
      this.onClick();
      this._handleInactive();
    }
  };

  connectedCallback() {
    // 键盘交互时，按下 Enter 键触发点击事件，同时也会立即触发 active 与 inactive 事件
    this.addEventListener('keydown', this._handleEnterKeyDown);
    // 鼠标交互时，鼠标进入和离开时触发
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
    // 聚焦与失焦
    this.addEventListener('focus', this._handleFocus);
    this.addEventListener('blur', this._handleBlur);
    // active 态，鼠标按下时触发，鼠标松开时触发
    this.addEventListener('mousedown', this._handleActive);
    this.addEventListener('mouseup', this._handleInactive);

    // 根据 autoFocus，决定是否自动获得焦点，该逻辑仅在首次渲染时执行一次
    this._autoFocus = this.hasAttribute('autofocus');
    if (this.autoFocus) this.focus();
  }

  disconectedCallback() {
    // 移除所有监听事件
    this.removeEventListener('keydown', this._handleEnterKeyDown);

    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);

    this.removeEventListener('focus', this._handleFocus);
    this.removeEventListener('blur', this._handleBlur);

    this.removeEventListener('mousedown', this._handleActive);
    this.removeEventListener('mouseup', this._handleInactive);
  }

  attributeChangedCallback(name: string, _: any, newValue: any) {
    const mapping: Record<string, any> = {
      'disable': () => (this.disable = newValue !== null),
      'on-click': () => (this.onClick = new Function(newValue) as () => void),
    };

    mapping[name]?.();
  }

  static get observedAttributes() {
    return ['on-click', 'disable'];
  }
}

customElements.define('prototype-button', PrototypeButton<{}>);
