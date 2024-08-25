import { PrototypeOverlay } from '../overlay';

export interface SelectProps {
  defaultValue?: string;
}

export interface SelectItemProps {
  value: string;
}

export interface SelectValueProps {
  renderValue: (value: string) => HTMLElement | string;
}

export interface SelectContext {
  index: number;
  value: string;

  focused: boolean;
  focus: () => void;

  show: () => void;
  close: () => void;

  options: string[];
  defaultValue: string;
  changeValue: (value: string, focus?: boolean) => void;

  selecting: boolean;

  setContext: (value: Partial<SelectContext>, notify?: boolean) => void;
}
