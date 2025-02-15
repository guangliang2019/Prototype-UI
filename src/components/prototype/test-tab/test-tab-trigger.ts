import { definePrototype, getContext, listenContext, useConnect } from '@/core';
import { PrototypeTestTabContext, TestTabTriggerProps } from './interface';
import { ContextConsumer } from '@/components/common';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { watchContext } from '@/core/context';

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

const PrototypeTestTabTrigger2 = definePrototype<{ value: string }>((self) => {
  watchContext(self, 'prototype-test-tab', (context, changedKeys) => {
    if (context.value === self.componentRef.value) {
      self.componentRef.setAttribute('data-active', '');
    } else {
      self.componentRef.removeAttribute('data-active');
    }
  });
  useConnect(self, () => {
    const context = getContext(self, 'prototype-test-tab');
    const value = self.componentRef.getAttribute('value') || '';
    self.componentRef.value = value;
    self.componentRef.addEventListener('click', () => {
      context.setValue(self.componentRef.value);
    });
  });
});

customElements.define('prototype-test-tab-trigger', WebComponentAdapter(PrototypeTestTabTrigger2));
