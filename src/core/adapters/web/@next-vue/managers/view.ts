class VueViewManager {
  private _element: HTMLElement | null = null;
  private _initialized = false;
  private _pendingElements: HTMLElement[] = [];
  init(element: HTMLElement) {
    this._element = element;
    this._initialized = true;
  }

  getElement() {
    if (!this._initialized) {
      this._pendingElements.push(this._element as HTMLElement);
    }
    return this._element;
  }
}

export default VueViewManager;
