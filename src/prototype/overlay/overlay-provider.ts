import { ContextProvider } from '@/common';
import { OverlayProviderProps, OverlayContext, OpenOverlayEventDetail } from './interface';
import ContextManager from '@/common/context/contextManager';
import PrototypeOverlay from './overlay';

export default class PrototypeOverlayProvider
  extends ContextProvider<
    {
      'prototype-overlay': OverlayContext;
    },
    any
  >
  implements OverlayProviderProps
{
  protected _providerKeys = new Set(['prototype-overlay'] as const);
  protected _consumerKeys = new Set([]);

  connectedCallback(): void {
    super.connectedCallback();
    // overlay open 事件通过冒泡被 provider 劫持，然后关闭 overlayKey 相同的其他 overlay
    this.addEventListener('overlay-open', this._handleOverlayOpen as EventListener);
  }
  // 同 overlayKey 的 overlay 同时只能存在一个，其他会在另一个调用 open 的同时进行 close
  // TODO: 让 overlay 在 open 的时候事件中带上一个 close 时会销毁的引用，然后通过 weakmap 来维护，比遍历性能更好
  private _handleOverlayOpen(event: CustomEvent<OpenOverlayEventDetail>) {
    const { overlayKey, overlay } = event.detail;
    const consumers = ContextManager.getInstance().getConsumers('prototype-overlay', this);
    for (const consumer of consumers) {
      if (
        consumer instanceof PrototypeOverlay &&
        // 必须是开着的
        consumer.getAttribute('data-open') !== null &&
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
