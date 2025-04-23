import { createContext } from '@/core/adapters/web/context-center';
import { ButtonExposes, ButtonProps } from '../as-button';
import { OverlayExposes, OverlayProps } from '../as-overlay/interface';
import { State } from '@/core/interface';

export interface SelectProps {
  defaultValue?: string;
}

export interface SelectTriggerProps extends ButtonProps {}
export interface SelectContentProps extends OverlayProps {}

export interface SelectTriggerExposes extends ButtonExposes {}
export interface SelectContentExposes extends OverlayExposes {}

export interface SelectItemProps extends ButtonProps {
  value: string;
}
export interface SelectItemExposes extends ButtonExposes {}

export interface SelectValueProps {
  renderValue: (value: string) => HTMLElement | string;
}
export interface SelectValueExposes extends ButtonExposes {}

export interface SelectContextType {
  index: number;
  value: string;

  width: number;

  focus: () => void;

  open: () => void;
  close: () => void;

  items: string[];
  defaultValue: string;
  changeValue: (value: string, focus?: boolean) => void;

  selecting: State<boolean>;
  focused: State<boolean>;

  rootRef: HTMLElement;
  triggerRef: HTMLElement;
  itemsRefs: HTMLElement[];
  valueRef: HTMLElement;
  contentRef: HTMLElement;
}

export interface SelectExposes {}
export const SelectContext = createContext<SelectContextType>('select');

export const DEFAULT_SELECT_ITEM_PROPS: SelectItemProps = {
  value: ' ',
};

export const DEFAULT_SELECT_PROPS: SelectProps = {
  defaultValue: '',
};