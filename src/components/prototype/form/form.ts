import { ContextProvider } from '@/components/common';
import { FormContext, PrototypeFormProps } from './interface';

export default class PrototypeForm<T extends Object>
  extends ContextProvider<FormContext<T>>
  implements PrototypeFormProps<T>
{
  protected _providerKeys = ['prototype-form'];
  protected _consumerKeys = [];

  submit: (data: T) => void = () => {};
  data: T = {} as T;
  validators: Record<string, (data: T) => boolean> = {};

  connectedCallback() {
    super.connectedCallback();

    this.setContext('prototype-form', {
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
        this.provideValues['prototype-form'].validate();
      },
    });
  }
}

customElements.define('prototype-form', PrototypeForm);
