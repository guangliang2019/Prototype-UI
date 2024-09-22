import { ContextProvider } from '@/common';
import { FormContext, PrototypeFormProps } from './interface';

export default class PrototypeForm<T extends Object>
  extends ContextProvider<FormContext<T>>
  implements PrototypeFormProps<T>
{
  protected _providerKey = 'prototype-form';
  protected _consumerKey = 'prototype';

  submit: (data: T) => void = () => {};
  data: T = {} as T;
  validators: Record<string, (data: T) => boolean> = {};

  connectedCallback() {
    super.connectedCallback();

    this.setContext({
      data: this.data,
      submit: () => {},
      validate: () => {
        for (const key of Object.keys(this.validators)) {
          if (!this.validators[key](this.data)) return false;
        }

        return true;
      },
      changeData: (key, value) => {
        this.data[key] = value;
        console.log(this.data);
        this.provideValue.validate();
        console.log(this.provideValue.validate());
      },
    });
  }
}

customElements.define('prototype-form', PrototypeForm);