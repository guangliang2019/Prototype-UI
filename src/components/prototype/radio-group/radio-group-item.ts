import { PrototypeRadioGroupContext, RadioGroupItemProps } from './interface';
import { ContextConsumer } from '@/components/common';

export const handleContextChangeSymbol = Symbol('prototype-radio-group');

export default class PrototypeRadioGroupItem<
    T extends PrototypeRadioGroupContext = PrototypeRadioGroupContext,
  >
  extends ContextConsumer<T>
  implements RadioGroupItemProps
{
  protected _consumerKeys = ['prototype-radio-group'];

  protected [handleContextChangeSymbol] = () => {};

  connectedCallback() {
    super.connectedCallback();
    this.addContextListener('prototype-radio-group', this[handleContextChangeSymbol]);
  }

  disconnectedCallback() {
    this.removeContextListener('prototype-radio-group', this[handleContextChangeSymbol]);

    // ContextConsumer 没有 disconnectedCallback，但是其他的 common 组件会有
    // 如果你的组件更改继承了 Trigger、Overlay 等其他 Consumer 组件，那么你需要在这里调用 super.disconnectedCallback();

    // super.disconnectedCallback();
  }
}

customElements.define('prototype-radio-group-item', PrototypeRadioGroupItem);
