export interface DialogProps {
  visible: boolean;
}

export interface DialogContext {
  visible: boolean;
  show: () => void;
  close: () => void;
}
