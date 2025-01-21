import { ContextConsumer } from '@/components/common';
import { PrototypeResizableContext, PrototypeResizableHandleProps } from './interface';
import { GlobalEvent } from '@/components/common/global-event';

export default class PrototypeResizableHandle<
    T extends PrototypeResizableContext = PrototypeResizableContext,
  >
  extends ContextConsumer<T>
  implements PrototypeResizableHandleProps
{
  protected _consumerKeys = ['prototype-resizable'];

  private _initialPosition: { x: number; y: number } = { x: -1, y: -1 };
  private _initialSize: { width: number; height: number }[] = [
    { width: -1, height: -1 },
    { width: -1, height: -1 },
  ];
  private _initialPanels: HTMLElement[] = [];
  private _isDragging = false;

  private _handleMouseMove = (e: MouseEvent) => {
    if (!this._isDragging) return;
    const { clientX: x, clientY: y } = e;

    const [backwardPanel, forwardPanel] = this._initialPanels;
    const [backwardSize, forwardSize] = this._initialSize;

    const { direction } = this._contextValues['prototype-resizable'];
    if (direction === 'horizontal') {
      const distance = x - this._initialPosition.x;
      forwardPanel.style.width = `${forwardSize.width - distance}px`;
      backwardPanel.style.width = `${backwardSize.width + distance}px`;
    }
    if (direction === 'vertical') {
      const distance = y - this._initialPosition.y;
      forwardPanel.style.height = `${forwardSize.height - distance}px`;
      backwardPanel.style.height = `${backwardSize.height + distance}px`;
    }
  };

  private _handleMouseUp = (e: MouseEvent) => {
    this._isDragging = false;
    document.body.style.cursor = this.style.cursor = 'default';
  };

  private _handleMouseDown = (e: MouseEvent) => {
    this._isDragging = true;
    this._initialPosition = { x: e.clientX, y: e.clientY };
    const panelRefs = this._contextValues['prototype-resizable'].panelRefs;

    const targetIndex = panelRefs.findIndex(
      (panel, i) => compareDOM(panel, this) === 1 && compareDOM(panelRefs[i - 1], this) === -1
    );
    if (targetIndex === -1) return;

    const backwardPanel = panelRefs[targetIndex - 1];
    const forwardPanel = panelRefs[targetIndex];

    this._initialSize = [
      { width: backwardPanel.clientWidth, height: backwardPanel.clientHeight },
      { width: forwardPanel.clientWidth, height: forwardPanel.clientHeight },
    ];

    this._initialPanels = [backwardPanel, forwardPanel];

    if (this.contextValues['prototype-resizable'].direction === 'horizontal') {
      document.body.style.cursor = this.style.cursor = 'ew-resize';
    } else {
      document.body.style.cursor = this.style.cursor = 'ns-resize';
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['prototype-resizable'].handleRefs.push(this);

    this.addEventListener('mousedown', this._handleMouseDown);
    GlobalEvent.addListener('mousemove', this._handleMouseMove as EventListener);
    GlobalEvent.addListener('mouseup', this._handleMouseUp as EventListener);

    if (this.contextValues['prototype-resizable'].direction === 'horizontal') {
      this.style.width = '1px';
      this.style.cursor = 'ew-resize';
    } else {
      this.style.height = '1px';
      this.style.cursor = 'ns-resize';
    }
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this._handleMouseDown);
    GlobalEvent.removeListener('mousemove', this._handleMouseMove as EventListener);
    GlobalEvent.removeListener('mouseup', this._handleMouseUp as EventListener);
  }
}

customElements.define('prototype-resizable-handle', PrototypeResizableHandle);

/**
 * 比较两个 DOM 节点的位置。
 * @param a - 第一个 DOM 节点
 * @param b - 第二个 DOM 节点
 * @returns 负数表示 a 在 b 前，0 表示相同，正数表示 a 在 b 后
 */
export function compareDOM(a: Node, b: Node): number {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1; // a 在 b 前
  } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1; // a 在 b 后
  }
  return 0; // a 和 b 相同
}
