import { ContextProvider } from '@/common';
import { OverlayProviderProps, OverlayContext, ShowOverlayEventDetail } from './interface';
import ContextManager from '@/common/context/contextManager';
import PrototypeOverlay from './overlay';

export default class PrototypeOverlayProvider
  extends ContextProvider<OverlayContext>
  implements OverlayProviderProps
{
  protected _key = 'prototype-overlay';

  connectedCallback(): void {
    super.connectedCallback();
    // overlay show 事件通过冒泡被 proivder 劫持，然后关闭 overlayKey 相同的其他 overlay
    this.addEventListener('overlay-show', this._handleOverlayShow as EventListener);
  }
  // 同 overlayKey 的 overlay 同时只能存在一个，其他会在另一个调用 show 的同时进行 close
  private _handleOverlayShow(event: CustomEvent<ShowOverlayEventDetail>) {
    const { overlayKey, overlay } = event.detail;
    const consumers = ContextManager.getInstance().getConsumers(this) as PrototypeOverlay[];
    for (const consumer of consumers) {
      if (consumer.overlayKey === overlayKey && consumer !== overlay) {
        consumer.close();
      }
    }
  }
}

customElements.define('prototype-overlay-provider', PrototypeOverlayProvider);
