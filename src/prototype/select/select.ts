import { ContextProvider } from '@/common';
import { SelectContext } from './interface';

export default class PrototypeSelect extends ContextProvider<SelectContext> {
  protected _key = 'prototype-select';
  private _defaultValue: string = '';
  private _index: number = -1;
  private _value: string = '';
  private _options: string[] = [];

  constructor() {
    super();
    this.setContext({
      options: [],
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._defaultValue = this.getAttribute('default-value') || '';
    this._value = this._defaultValue;

    this.setContext({
      defaultValue: this._defaultValue,
      index: this._index,
      value: this._value,
      options: this._options,
      changeValue: (value, focus = false) => {
        this._value = value;
        this._index = this._options.indexOf(value);
        if (focus) {
          this._contextValue.focus();
        }
        this.setContext({
          index: this._index,
          value: this._value,
        });
      },
      // setContext: this.setContext.bind(this),
    });
    console.log(this._contextValue);
  }
}

customElements.define('prototype-select', PrototypeSelect);
