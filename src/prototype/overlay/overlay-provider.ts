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
  // TODO: 让 overlay 在 show 的时候事件中带上一个 close 时会销毁的引用，然后通过 weakmap 来维护，比遍历性能更好
  private _handleOverlayShow(event: CustomEvent<ShowOverlayEventDetail>) {
    const { overlayKey, overlay } = event.detail;
    const consumers = ContextManager.getInstance().getConsumers(this) as PrototypeOverlay<{}>[];
    for (const consumer of consumers) {
      if (
        // 必须是开着的
        consumer.getAttribute('data-show') !== null &&
        // overlayKey 相同
        consumer.overlayKey === overlayKey &&
        // 不是本次打开的 overlay
        consumer !== overlay
      ) {
        consumer.close();
      }
    }
  }
}

customElements.define('prototype-overlay-provider', PrototypeOverlayProvider);
