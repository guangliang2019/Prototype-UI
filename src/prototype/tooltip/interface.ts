export interface TooltipContext {
  visible: boolean;
  oepn: () => void;
  close: () => void;

  openDelay: number;
  hideDelay: number;
}
