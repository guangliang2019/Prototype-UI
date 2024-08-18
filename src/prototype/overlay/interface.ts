export interface OverlayProviderProps {}

export interface OverlayContext {
  show: (target?: HTMLElement) => HTMLElement;
  close: (overlay: HTMLElement) => void;
}
