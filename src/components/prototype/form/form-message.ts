import { ContextConsumer } from '@/components/common';
import { FormContext } from './interface';

export default class PrototypeFormMessage<T extends Object> extends ContextConsumer<
  FormContext<T>
> {
  protected _consumerKeys = ['prototype-form'];
}

customElements.define('prototype-form-message', PrototypeFormMessage);
