export interface DialogProps {
  visible: boolean;
}

export interface DialogContext {
  visible: boolean;
  open: () => void;
  close: () => void;
}
