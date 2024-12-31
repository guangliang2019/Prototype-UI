import { ContextConsumer } from '@/common';
import { PrototypeResizableContext, PrototypeResizableHandleProps } from './interface';

export default class PrototypeResizableHandle<
    T extends PrototypeResizableContext = PrototypeResizableContext,
  >
  extends ContextConsumer<T>
  implements PrototypeResizableHandleProps
{
  protected _consumerKeys = ['prototype-resizable'];

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['prototype-resizable'].handleRefs.push(this);

    this.addEventListener('mousedown', () => {
      console.log('mousedown');
      this._contextValues['prototype-resizable'].rootRef.style.backgroundColor = 'red';
      console.log(this._contextValues['prototype-resizable']);
    });

    console.log(this.contextValues['prototype-resizable'].direction);
    if (this.contextValues['prototype-resizable'].direction === 'horizontal') {
      this.style.width = '10px';
      this.style.cursor = 'ew-resize';
    } else {
      this.style.height = '10px';
      this.style.cursor = 'ns-resize';
    }

    console.log('PrototypeResizableHandle connectedCallback');
  }
}

customElements.define('prototype-resizable-handle', PrototypeResizableHandle);
