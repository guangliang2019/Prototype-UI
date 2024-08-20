import { ContextConsumer } from '../../common/context-provider';
import { TabContext, TabTrigerProps } from './interface';

export default class PrototypeTabTrigger
  extends ContextConsumer<TabContext>
  implements TabTrigerProps
{
  private _value = '';

  get value(): string {
    return this._value;
  }

  constructor() {
    super();
    this._key = 'prototype-tab';
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('cursor-pointer');
    this._value = this.getAttribute('value') || '';
    this._contextValue.tabs.push(this._value);
    this._contextValue.tabRefs.push(this);

    this.onContextChange = (value) => {
      if (value.tabValue === this._value) {
        this.tabIndex = 0;
        this.setAttribute('data-selected', '');
      } else {
        this.tabIndex = -1;
        this.removeAttribute('data-selected');
      }
    };

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);

    // 初始化默认选中状态
    if (this._value === this.contextValue.defaultValue) {
      this.contextValue.changeTab(this._value);
    }
  }

  disconectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
    this._contextValue.tabs.splice(this._contextValue.tabs.indexOf(this._value), 1);
    this._contextValue.tabRefs.splice(this._contextValue.tabRefs.indexOf(this), 1);
  }

  private _handleClick = () => this.contextValue.changeTab(this._value);
  private _handleKeydown = (event: KeyboardEvent) => {
    const currentIndex = this.contextValue.tabs.indexOf(this._value);
    const nextIndex = (currentIndex + 1) % this.contextValue.tabs.length;
    const prevIndex =
      (currentIndex - 1 + this.contextValue.tabs.length) % this.contextValue.tabs.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
      this.contextValue.changeTab(this.contextValue.tabs[nextIndex], true);

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      this.contextValue.changeTab(this.contextValue.tabs[prevIndex], true);
  };
}

customElements.define('prototype-tab-trigger', PrototypeTabTrigger);
