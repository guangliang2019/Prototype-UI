import { ContextProvider } from '@/common';
import { FormContext, FormItemContext } from './interface';

export default class PrototypeFormItem<T extends Object> extends ContextProvider<
  FormItemContext,
  FormContext<T>
> {
  protected _consumerKey = 'prototype-form';
  protected _providerKey = 'prototype-form-item';

  private _key = '';

  connectedCallback() {
    super.connectedCallback();

    this._key = this.getAttribute('key') || '';

    this.setContext({
      key: this._key,
      changeFormItemValue: (value: any) => {
        this._contextValue.changeData(this._key as keyof T, value);
      },
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-form-item', PrototypeFormItem);
