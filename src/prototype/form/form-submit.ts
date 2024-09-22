import { ContextConsumer } from '@/common';
import { FormContext } from './interface';

export default class PrototypeFormSubmit<T> extends ContextConsumer<FormContext<T>> {
  protected _consumerKey = 'protptype-form';
}

customElements.define('prototype-form-submit', PrototypeFormSubmit)
