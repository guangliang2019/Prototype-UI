import PrototypeSelect from './select';
import PrototypeSelectItem from './select-item';
import PrototypeSelectTrigger from './select-trigger';

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

  width: number;

  focused: boolean;
  focus: () => void;

  open: () => void;
  close: () => void;

  items: string[];
  defaultValue: string;
  changeValue: (value: string, focus?: boolean) => void;

  selecting: boolean;

  rootRef: PrototypeSelect;
  triggerRef: PrototypeSelectTrigger;
  itemsRefs: PrototypeSelectItem[];
}
