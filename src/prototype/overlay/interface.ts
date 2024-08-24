import PrototypeOverlay from './overlay';

export interface OverlayProviderProps {}

export interface OverlayProps {
  target?: string;
  overlayKey?: string;
  unmount?: boolean;
}

export interface OverlayContext {
  show: (content: HTMLElement, target?: HTMLElement, dx?: number, dy?: number) => HTMLElement;
  close: (overlay: HTMLElement) => void;
}

export interface ShowOverlayEventDetail {
  overlayKey: string;
  overlay: PrototypeOverlay;
}
