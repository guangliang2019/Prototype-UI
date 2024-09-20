import { SelectContext, SelectItemProps } from './interface';
import { PrototypeButton } from '../button';
import { binarySearch } from '@/utils/search';
import { compareDOM } from '@/utils/dom';

export default class PrototypeSelectItem
  extends PrototypeButton<SelectContext>
  implements SelectItemProps
{
  protected _key = 'prototype-select';
  private _value = '';
  get value(): string {
    return this._value;
  }

  private _handleSelectItemMouseEnter = () => {
    this.focus();
  };
  private _handleSelectItemMouseLeave = () => {
    this.blur();
  };

  private _handleKeydown = (event: KeyboardEvent) => {
    const currentIndex = this.contextValue.items.indexOf(this._value);
    const nextIndex = (currentIndex + 1) % this.contextValue.items.length;
    const prevIndex =
      (currentIndex - 1 + this.contextValue.items.length) % this.contextValue.items.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.contextValue.itemsRefs[nextIndex].focus();
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.contextValue.itemsRefs[prevIndex].focus();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.contextValue.changeValue(this._value, true);
      this.contextValue.close();
    }

    if (event.key === 'Tab') {
      this.contextValue.close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = -1;

    this._value = this.getAttribute('value') || '';
    if (this._contextValue.defaultValue === this.value) this.setAttribute('data-selected', '');

    const insertIndex = binarySearch(this._contextValue.itemsRefs, this, compareDOM);
    this._contextValue.itemsRefs.splice(insertIndex, 0, this);
    this._contextValue.items.splice(insertIndex, 0, this._value);

    this.addEventListener('mouseenter', this._handleSelectItemMouseEnter);
    this.addEventListener('mouseleave', this._handleSelectItemMouseLeave);

    this.addEventListener('keydown', this._handleKeydown as EventListener);

    this.onClick = () => {
      this._contextValue.changeValue(this.value, true);
      this._contextValue.close();
      this._contextValue.selecting = false;
    };

    this.onContextChange = (context) => {
      if (this.value === context.value) {
        this.setAttribute('data-selected', '');
      } else {
        this.removeAttribute('data-selected');
      }
    };
  }

  disconnectedCallback() {
    this.removeEventListener('mouseenter', this._handleSelectItemMouseEnter);
    this.removeEventListener('mouseleave', this._handleSelectItemMouseLeave);

    this.removeEventListener('keydown', this._handleKeydown as EventListener);

    const removeIndex = binarySearch(this._contextValue.itemsRefs, this, compareDOM);
    this._contextValue.items.splice(removeIndex, 1);
    this._contextValue.itemsRefs.splice(removeIndex, 1);

    super.disconnectedCallback();
  }
}

customElements.define('prototype-select-item', PrototypeSelectItem);
