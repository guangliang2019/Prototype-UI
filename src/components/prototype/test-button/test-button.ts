import { ContextProvider } from '@/components/common';
import { PrototypeTestButtonContext, TestButtonProps } from './interface';

export default class PrototypeTestButton<
    T extends Record<string, Object> & PrototypeTestButtonContext = PrototypeTestButtonContext,
  >
  extends ContextProvider<T> implements TestButtonProps
{
  protected _providerKeys = ['prototype-test-button'];
  protected _consumerKeys = [];

  connectedCallback() {
    super.connectedCallback();

    this.setContext('prototype-test-button', {
      rootRef: this,
    } as Partial<PrototypeTestButtonContext['prototype-test-button']>);
  }
}

customElements.define('prototype-test-button', PrototypeTestButton);
