import { ContextProvider } from '@/components/common';
import { PrototypeRadioGroupContext, RadioGroupProps } from './interface';

export default class PrototypeRadioGroup<
    T extends Record<string, Object> & PrototypeRadioGroupContext = PrototypeRadioGroupContext,
  >
  extends ContextProvider<T>
  implements RadioGroupProps
{
  protected _providerKeys = ['prototype-radio-group'];
  protected _consumerKeys = [];

  connectedCallback() {
    super.connectedCallback();

    this.setContext('prototype-radio-group', {
      rootRef: this,
    } as Partial<PrototypeRadioGroupContext['prototype-radio-group']>);
  }
}

customElements.define('prototype-radio-group', PrototypeRadioGroup);
