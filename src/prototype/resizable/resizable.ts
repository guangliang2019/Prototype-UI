import { ContextProvider } from '@/common';
import { PrototypeResizableContext, PrototypeResizableProps } from './interface';

export default class PrototypeResizable<
    T extends Record<string, Object> & PrototypeResizableContext = PrototypeResizableContext,
  >
  extends ContextProvider<T>
  implements PrototypeResizableProps
{
  protected _providerKeys = ['prototype-resizable'];

  private _direction: PrototypeResizableProps['direction'] = 'horizontal';
  get direction() {
    return this._direction;
  }

  connectedCallback() {
    super.connectedCallback();
    this._direction = this.getAttribute('direction') === 'vertical' ? 'vertical' : 'horizontal';

    this.setContext('prototype-resizable', {
      direction: this._direction,
      rootRef: this,
      handleRefs: [],
      panelRefs: [],
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

customElements.define('prototype-resizable', PrototypeResizable);
