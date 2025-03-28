import { ContextProvider } from '@/components/common';
import { PrototypeTestTabContext, TestTabProps } from './interface';
import { definePrototype, PropType, WebComponentAdapter } from '@/next-core';
import asTabs from '@/next-core/behaviors/as-tabs/as-tabs';
import { TabsProps } from '@/next-core/behaviors/as-tabs/interface';

export default class PrototypeTestTab<
    T extends Record<string, Object> & PrototypeTestTabContext = PrototypeTestTabContext,
  >
  extends ContextProvider<T>
  implements TestTabProps
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

customElements.define(
  'prototype-test-tab',
  WebComponentAdapter<TabsProps & Record<string, PropType>>(
    definePrototype({
      displayName: 'prototype-test-tab',
      setup: (hooks) => {
        asTabs(hooks);
      },
    })
  )
);
