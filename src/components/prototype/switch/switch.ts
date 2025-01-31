import { ContextProvider } from '@/components/common';
import { PrototypeSwitchContext, SwitchProps } from './interface';

export default class PrototypeSwitch<
    T extends Record<string, Object> & PrototypeSwitchContext = PrototypeSwitchContext,
  >
  extends ContextProvider<T> implements SwitchProps
{
  protected _providerKeys = ['prototype-switch'];
  protected _consumerKeys = [];

  connectedCallback() {
    super.connectedCallback();

    this.setContext('prototype-switch', {
      rootRef: this,
    } as Partial<PrototypeSwitchContext['prototype-switch']>);
  }
}

customElements.define('prototype-switch', PrototypeSwitch);
