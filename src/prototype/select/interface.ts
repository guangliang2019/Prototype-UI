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

  oepn: () => void;
  close: () => void;

  options: string[];
  defaultValue: string;
  changeValue: (value: string, focus?: boolean) => void;

  selecting: boolean;
}
