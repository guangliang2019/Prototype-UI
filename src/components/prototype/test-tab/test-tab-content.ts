import { definePrototype, PropType, WebComponentAdapter } from '@/next-core';
import { PrototypeTestTabContext, TestTabContentProps } from './interface';
import { ContextConsumer } from '@/components/common';
import { TabsContentProps } from '@/next-core/behaviors/as-tabs/interface';
import asTabsContent from '@/next-core/behaviors/as-tabs/as-tabs-content';

export const handleContextChangeSymbol = Symbol('prototype-test-tab');

export default class PrototypeTestTabContent<
    T extends PrototypeTestTabContext = PrototypeTestTabContext,
  >
  extends ContextConsumer<T>
  implements TestTabContentProps
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
  'prototype-test-tab-content',
  WebComponentAdapter<TabsContentProps & Record<string, PropType>>(
    definePrototype({}, (hooks) => {
      asTabsContent(hooks);
    })
  )
);
