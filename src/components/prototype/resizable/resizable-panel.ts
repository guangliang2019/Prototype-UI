import { ContextConsumer } from '@/components/common';
import { PrototypeResizableContext, PrototypeResizablePanelProps } from './interface';

const RESIZABLE_DEFAULT_SIZE = '-1px';

export default class PrototypeResizablePanel<
    T extends PrototypeResizableContext = PrototypeResizableContext,
  >
  extends ContextConsumer<T>
  implements PrototypeResizablePanelProps
{
  protected _consumerKeys = ['prototype-resizable'];

  private _defaultSize = RESIZABLE_DEFAULT_SIZE;
  get defaultSize() {
    return this._defaultSize;
  }

  connectedCallback() {
    super.connectedCallback();
    this._defaultSize = this.getAttribute('default-size') ?? RESIZABLE_DEFAULT_SIZE;
    this._contextValues['prototype-resizable'].panelRefs.push(this);
  }
}

customElements.define('prototype-resizable-panel', PrototypeResizablePanel);
