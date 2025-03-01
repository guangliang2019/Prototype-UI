export interface OverlayProps {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

export interface asOverlayOptions {
  handleVisibleChange?: (visible: boolean) => void;
  handleClickOutside?: (event: MouseEvent) => boolean;
}
