import { State } from '@/next-core/interface';

export interface OverlayProps {
  visible: boolean;
  onVisibleChange?: (visible: boolean) => void;
  clickOutsideInterceptor?: (event: MouseEvent) => boolean;
}

export interface OverlayState {
  visible: State<boolean>;
}

export interface OverlayActions {
  show: () => void;
  hide: () => void;
}
