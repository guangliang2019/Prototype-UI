export interface DialogProps {
  visible: boolean;
}

export interface DialogContext {
  visible: boolean;
  oepn: () => void;
  close: () => void;
}
