import { State } from '@/core/interface';

export interface OverlayProps {
  visible: boolean;
  onVisibleChange?: (visible: boolean) => void;
  clickOutsideInterceptor?: (event: MouseEvent) => boolean;
}

export interface OverlayState {
  visible: State<boolean>;
}

export interface OverlayExposes {
  show: () => void;
  hide: () => void;
}

export const DEFAULT_OVERLAY_PROPS: OverlayProps = {
  visible: false,
  onVisibleChange: () => {},
  clickOutsideInterceptor: () => true,
};
