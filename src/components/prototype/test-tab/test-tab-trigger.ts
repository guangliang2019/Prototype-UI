import { defineComponent, getContext, listenContext, useConnect, useDisconnect } from '@/core';
import { PrototypeTestTabContext, TestTabTriggerProps } from './interface';
import { ContextConsumer } from '@/components/common';

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

const PrototypeTestTabTrigger2 = defineComponent<{ value: string }>((self) => {
  listenContext(self, 'prototype-test-tab', (context, changedKeys) => {
    if (context.value === self.value) {
      self.setAttribute('data-active', '');
    } else {
      self.removeAttribute('data-active');
    }
  });
  useConnect(self, () => {
    const context = getContext(self, 'prototype-test-tab');
    const value = self.getAttribute('value') || '';
    self.value = value
    self.addEventListener('click', () => {
      context.setValue(self.value);
    })
  });
});

customElements.define('prototype-test-tab-trigger', PrototypeTestTabTrigger2);
