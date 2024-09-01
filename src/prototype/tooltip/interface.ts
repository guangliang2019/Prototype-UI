export interface TooltipContext {
  visible: boolean;
  open: () => void;
  close: () => void;

  openDelay: number;
  hideDelay: number;
}
