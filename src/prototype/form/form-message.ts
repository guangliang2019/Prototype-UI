import { ContextConsumer } from '@/common';
import { FormContext } from './interface';

export default class PrototypeFormMessage<T extends Object> extends ContextConsumer<FormContext<T>> {
  protected _consumerKey = 'prototype-form';
}

customElements.define('prototype-form-message', PrototypeFormMessage)
