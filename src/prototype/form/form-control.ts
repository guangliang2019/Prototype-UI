import { ContextConsumer } from '@/common';
import { FormItemContext } from './interface';

export default class PrototypeFormControl extends ContextConsumer<FormItemContext> {
  protected _consumerKey = 'protptype-form-item';
}

customElements.define('prototype-form-control', PrototypeFormControl);
