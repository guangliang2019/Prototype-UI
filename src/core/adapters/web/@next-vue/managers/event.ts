import { EventHandler, EventManager, EventOptions } from '@/core/interface';

class VueEventManager implements EventManager {
  /**
   *是否初始化过的标记
   */
  private _initFlag = false;

  private _rootRef: HTMLElement | null = null;

  private _eventMap: Map<string, Set<EventHandler>> = new Map();
  private _pendingEvents: {
    eventName: string;
    handler: EventHandler;
    options?: EventOptions;
  }[] = [];

  private _checkInit(funcName: string) {
    if (this._initFlag) return;
    throw new Error(`[Vue Adapter] 不要在 setup 中使用 p.event.${funcName}`);
  }

  init(rootRef: HTMLElement) {
    this._initFlag = true;
    this._rootRef = rootRef;
  }

  on(eventName: string, handler: EventHandler, options?: EventOptions) {
    if (!this._eventMap.has(eventName)) {
      this._eventMap.set(eventName, new Set());
    }
    this._eventMap.get(eventName)?.add(handler);
    if (this._initFlag) {
      this._rootRef?.addEventListener(eventName, handler, options);
    } else {
      this._pendingEvents.push({ eventName, handler, options });
    }
  }

  off(eventName: string, handler: EventHandler) {
    this._eventMap.get(eventName)?.delete(handler);
    if (this._eventMap.get(eventName)?.size === 0) {
      this._eventMap.delete(eventName);
    }
    if (this._initFlag) {
      this._rootRef?.removeEventListener(eventName, handler);
    } else {
      this._pendingEvents = this._pendingEvents.filter(
        (event) => event.eventName !== eventName || event.handler !== handler
      );
    }
  }

  emit(eventName: string, detail: any) {
    this._checkInit('emit');
    this._rootRef?.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  once(eventName: string, handler: EventHandler) {
    if (this._initFlag) {
      this._rootRef?.addEventListener(eventName, handler, { once: true });
    } else {
      this._pendingEvents.push({ eventName, handler, options: { once: true } });
    }
  }

  clearAll() {
    if (this._initFlag) {
      this._eventMap.forEach((handlers, eventName) => {
        handlers.forEach((handler) => {
          this._rootRef?.removeEventListener(eventName, handler);
        });
      });
    } else {
      throw new Error(
        '[Vue Adapter] 可疑的内部错误，在 rootRef 不存在的情况下尝试调用 eventManager 的 clearAll 方法'
      );
    }
    this._eventMap.clear();
  }

  markAsTrigger() {
    throw new Error('[TODO] VueEventManager 目前不支持 markAsTrigger');
  }

  mount() {
    if (!this._initFlag) {
      throw new Error('[Vue Adapter] 调用 mount 方法时, 需要先调用 init 方法');
    }
    this._pendingEvents.forEach((event) => {
      this.on(event.eventName, event.handler, event.options);
    });
    this._pendingEvents = [];
  }

  destroy() {
    if (this._initFlag) {
      this.clearAll();
    } else {
      throw new Error(
        '[Vue Adapter] 可疑的内部错误，在 rootRef 不存在的情况下尝试调用 eventManager 的 destroy 方法'
      );
    }
    this._initFlag = false;
    this._rootRef = null;
  }
}

export default VueEventManager;
