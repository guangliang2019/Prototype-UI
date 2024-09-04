import PrototypeOverlay from './overlay';

export interface OverlayProviderProps {}

export interface OverlayProps {
  target?: string;
  overlayKey?: string;
  unmount?: boolean;
  onClickOutside?: (event: MouseEvent) => void;
}

export interface OverlayContext {}

export interface OpenOverlayEventDetail {
  overlayKey: string;
  overlay: PrototypeOverlay<any>;
}
