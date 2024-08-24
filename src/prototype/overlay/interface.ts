import PrototypeOverlay from './overlay';

export interface OverlayProviderProps {}

export interface OverlayProps {
  target?: string;
  overlayKey?: string;
  unmount?: boolean;
}

export interface OverlayContext {}

export interface ShowOverlayEventDetail {
  overlayKey: string;
  overlay: PrototypeOverlay;
}
