class GlobalEventManger {
  private static _listeners = new Map<keyof HTMLElementEventMap, Set<(e: Event) => void>>();
  private static _globalListeners = new Map<keyof HTMLElementEventMap, (e: Event) => void>();

  private static _handleEventListener = (eventName: keyof HTMLElementEventMap, e: Event) => {
    const listeners = this._listeners.get(eventName);
    if (listeners) {
      listeners.forEach((listener) => listener(e));
    }
  };

  static addListener(eventName: keyof HTMLElementEventMap, listener: (e: Event) => void) {
    if (!this._listeners.has(eventName)) {
      this._listeners.set(eventName, new Set());
      this._globalListeners.set(eventName, (e) => this._handleEventListener(eventName, e));
      document.addEventListener(eventName, this._globalListeners.get(eventName) as EventListener);
    }
    this._listeners.get(eventName)?.add(listener);
  }

  static removeListener(eventName: keyof HTMLElementEventMap, listener: (e: Event) => void) {
    if (!this._listeners.has(eventName)) return;
    this._listeners.get(eventName)?.delete(listener);
    if (this._listeners.get(eventName)?.size === 0) {
      this._listeners.delete(eventName);
      document.removeEventListener(
        eventName,
        this._globalListeners.get(eventName) as EventListener
      );
      this._globalListeners.delete(eventName);
    }
  }
}

export default GlobalEventManger;
