import { ContextProvider } from '@/common';
import { SelectContext } from './interface';
import PrototypeSelectItem from './select-item';

export default class PrototypeSelect extends ContextProvider<SelectContext> {
  protected _providerKey = 'prototype-select';
  protected _consumerKey = 'prototype-select';
  private _defaultValue: string = '';
  private _index: number = -1;
  private _value: string = '';
  private _items: string[] = [];
  private _selecting: boolean = false;
  private _itemRefs: PrototypeSelectItem[] = [];

  constructor() {
    super();
    this.setContext({
      items: [],
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._defaultValue = this.getAttribute('default-value') || '';
    this._value = this._defaultValue;
    this.setAttribute('data-state', 'close');

    this.setContext({
      defaultValue: this._defaultValue,
      index: this._index,
      value: this._value,
      items: this._items,
      selecting: this._selecting,
      changeValue: (value, focus = false) => {
        this._value = value;
        this._index = this._items.indexOf(value);
        if (focus) {
          this._provideValue.focus();
        }
        this.setContext({
          index: this._index,
          value: this._value,
        });
      },
      itemsRefs: this._itemRefs,
      rootRef: this,
    });
  }
}

customElements.define('prototype-select', PrototypeSelect);
