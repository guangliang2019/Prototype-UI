import { Component } from '@/core/interface';
import { ButtonProps } from '../button';

export interface PrototypeSelectProps {
  defaultValue?: string;
}

export interface SelectItemProps extends ButtonProps {
  value: string;
}

export interface SelectValueProps {
  renderValue: (value: string) => HTMLElement | string;
}

export interface PrototypeSelectContext {
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

  rootRef: Component;
  triggerRef: Component;
  itemsRefs: Component[];
  valueRef: Component;
  contentRef: Component;
}
