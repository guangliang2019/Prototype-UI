import { TabContext, TabTriggerProps } from './interface';
import { PrototypeTrigger } from '../trigger';
import { binarySearch } from '@/utils/search';
import { compareDOM } from '@/utils/dom';

export default class PrototypeTabTrigger
  extends PrototypeTrigger<TabContext>
  implements TabTriggerProps
{
  protected _consumerKey = 'prototype-tab';
  private _value = '';

  get value(): string {
    return this._value;
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.cursor = 'pointer';
    this._value = this.getAttribute('value') || '';
    const insertIndex = binarySearch(this._contextValue.tabRefs, this, compareDOM);
    this._contextValue.tabRefs.splice(insertIndex, 0, this);
    this._contextValue.tabs.splice(insertIndex, 0, this._value);

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
    this.addEventListener('keydown', this._handleKeydown as EventListener);

    // 初始化默认选中状态
    if (this._value === this.contextValue.defaultValue) {
      this.contextValue.changeTab(this._value);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown as EventListener);

    const removeIndex = binarySearch(this._contextValue.tabRefs, this, compareDOM);

    this._contextValue.tabs.splice(removeIndex, 1);
    this._contextValue.tabRefs.splice(removeIndex, 1);
  }

  private _handleClick = () => this.contextValue.changeTab(this._value);
  private _handleKeydown = (event: KeyboardEvent) => {
    const currentIndex = this.contextValue.tabs.indexOf(this._value);
    const nextIndex = (currentIndex + 1) % this.contextValue.tabs.length;
    const prevIndex =
      (currentIndex - 1 + this.contextValue.tabs.length) % this.contextValue.tabs.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.contextValue.changeTab(this.contextValue.tabs[nextIndex], true);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.contextValue.changeTab(this.contextValue.tabs[prevIndex], true);
    }
  };
}

customElements.define('prototype-tab-trigger', PrototypeTabTrigger);
