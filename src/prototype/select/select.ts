import { ContextProvider } from '@/common';
import { SelectContext } from './interface';
import PrototypeSelectItem from './select-item';
import { FormItemContext } from '../form/interface';

export default class PrototypeSelect extends ContextProvider<
  {
    'prototype-select': SelectContext;
  },
  {
    'prototype-form-item': FormItemContext;
  }
> {
  protected _providerKeys = new Set(['prototype-select'] as const);
  protected _consumerKeys = new Set(['prototype-form-item'] as const);
  private _defaultValue: string = '';
  private _index: number = -1;
  private _value: string = '';
  private _items: string[] = [];
  private _selecting: boolean = false;
  private _itemRefs: PrototypeSelectItem[] = [];

  constructor() {
    super();
    this.setContext('prototype-select', {
      items: [],
    });
  }

  private _handleFormAction = () => {
    if (this._contextValues['prototype-form-item']) {
      this._contextValues['prototype-form-item'].changeFormItemValue(this._value);
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._defaultValue = this.getAttribute('default-value') || '';
    this._value = this._defaultValue;
    this.setAttribute('data-state', 'close');
    this._handleFormAction();

    this.setContext('prototype-select', {
      defaultValue: this._defaultValue,
      index: this._index,
      value: this._value,
      items: this._items,
      selecting: this._selecting,
      changeValue: (value, focus = false) => {
        this._value = value;
        this._index = this._items.indexOf(value);

        this.setContext('prototype-select', {
          index: this._index,
          value: this._value,
        });
        this._handleFormAction();
        if (focus) {
          this._provideValues['prototype-select'].focus();
        }
        this._provideValues['prototype-select'].close();
      },
      itemsRefs: this._itemRefs,
      rootRef: this,
    });
  }
}

customElements.define('prototype-select', PrototypeSelect);
