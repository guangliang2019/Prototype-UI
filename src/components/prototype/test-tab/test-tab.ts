import { ContextProvider } from '@/components/common';
import { PrototypeTestTabContext, TestTabProps } from './interface';
import { defineComponent, provideContext } from '@/core';

export default class PrototypeTestTab<
    T extends Record<string, Object> & PrototypeTestTabContext = PrototypeTestTabContext,
  >
  extends ContextProvider<T> implements TestTabProps
{
  protected _providerKeys = ['prototype-test-tab'];
  protected _consumerKeys = [];

  connectedCallback() {
    super.connectedCallback();

    this.setContext('prototype-test-tab', {
      rootRef: this,
    } as Partial<PrototypeTestTabContext['prototype-test-tab']>);
  }
}

const PrototypeTestTab2 = defineComponent((self) => {
  provideContext<any>(self, 'prototype-test-tab', (setContext) => {
    const defaultValue = self.getAttribute('default-value') || '';
    return {
      rootRef: self,
      value: defaultValue,
      setValue: (value: string) => {
        setContext({value})
      }
    }
  })
})

customElements.define('prototype-test-tab', PrototypeTestTab2);
