import { ContextProvider } from '@/common';
import { FormContext, PrototypeFormProps } from './interface';

export default class PrototypeForm<T>
  extends ContextProvider<FormContext<T>>
  implements PrototypeFormProps<T>
{
  protected _providerKey = 'prototype-form';
  protected _consumerKey = 'prototype-form';

  onSubmit: (data: T) => void = () => {};
  validators: Record<string, (data: T) => boolean> = {};
}

customElements.define('prototype-form', PrototypeForm);
