import { definePrototype, PropType, WebComponentAdapter } from '@/next-core';
import { PrototypeTestTabContext, TestTabTriggerProps } from './interface';
import { ContextConsumer } from '@/components/common';
import { TabsTriggerProps } from '@/core/components/tabs';
import asTabsTrigger from '@/next-core/behaviors/as-tabs/as-tabs-trigger';

export const handleContextChangeSymbol = Symbol('prototype-test-tab');

export default class PrototypeTestTabTrigger<
    T extends PrototypeTestTabContext = PrototypeTestTabContext,
  >
  extends ContextConsumer<T>
  implements TestTabTriggerProps
{
  protected _consumerKeys = ['prototype-test-tab'];

  protected [handleContextChangeSymbol] = () => {};

  connectedCallback() {
    super.connectedCallback();
    this.addContextListener('prototype-test-tab', this[handleContextChangeSymbol]);
  }

  disconnectedCallback() {
    this.removeContextListener('prototype-test-tab', this[handleContextChangeSymbol]);

    // ContextConsumer 没有 disconnectedCallback，但是其他的 common 组件会有
    // 如果你的组件更改继承了 Trigger、Overlay 等其他 Consumer 组件，那么你需要在这里调用 super.disconnectedCallback();

    // super.disconnectedCallback();
  }
}

customElements.define(
  'prototype-test-tab-trigger',
  WebComponentAdapter<TabsTriggerProps & Record<string, PropType>>(
    definePrototype({
      displayName: 'prototype-test-tab-trigger',
      setup: (hooks) => {
        asTabsTrigger(hooks);
      },
    })
  )
);
