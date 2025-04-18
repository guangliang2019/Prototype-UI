import { createContext } from '@/core/adapters/web/context-center';
import { ButtonProps } from '../as-button';
import { OverlayProps } from '../as-overlay/interface';
import { State } from '@/core/interface';
import { PrototypeAPI } from '@/core/interface';

export interface SelectProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface SelectTriggerProps extends ButtonProps {}
export interface SelectContentProps extends OverlayProps {}

export interface SelectItemProps extends ButtonProps {
  value: string;
  onClick?: () => void;
}

export interface SelectValueProps {
  renderValue: (value: string) => HTMLElement | string;
  children?: any;
}

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

export const SelectContext = createContext<SelectContextType>('select');

export interface ContextOptions {
  optional?: boolean;
  defaultValue?: any;
}

export interface ContextWatchResult<T> {
  context: T;
  isAvailable: boolean;
  onAvailable: (callback: (context: T) => void) => void;
}
