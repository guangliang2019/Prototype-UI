import { ContextProvider } from '@/common';
import { FormContext, PrototypeFormItemContext } from './interface';

export default class PrototypeFormItem<T extends Object> extends ContextProvider<
  PrototypeFormItemContext,
  FormContext<T>
> {
  protected _consumerKeys = ['prototype-form' as const];
  protected _providerKeys = ['prototype-form-item' as const];

  private _key = '';

  connectedCallback() {
    super.connectedCallback();

    this._key = this.getAttribute('key') || '';

    this.setContext('prototype-form-item', {
      key: this._key,
      changeFormItemValue: (value: any) => {
        this._contextValues['prototype-form'].changeData(this._key as keyof T, value);
      },
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-form-item', PrototypeFormItem);
