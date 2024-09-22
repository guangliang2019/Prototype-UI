import { ContextProvider } from '@/common';
import { FormContext, FormItemContext } from './interface';

export default class PrototypeFormItem<T> extends ContextProvider<FormItemContext, FormContext<T>> {
  protected _consumerKey = 'protptype-form';
  protected _providerKey = 'protptype-form-item';
}

customElements.define('prototype-form-item', PrototypeFormItem);
