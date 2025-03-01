import { Component, DataState } from '@/core/interface';
import { ButtonProps } from '../button';
import { OverlayProps } from '@/core/components/overlay/interface';

export interface SelectProps {
  defaultValue?: string;
}

export interface SelectContentProps extends OverlayProps {}

export interface SelectItemProps extends ButtonProps {
  value: string;
}

export interface SelectValueProps {
  renderValue: (value: string) => HTMLElement | string;
}

export interface SelectContext {
  index: number;
  value: string;

  width: number;

  focus: () => void;

  open: () => void;
  close: () => void;

  items: string[];
  defaultValue: string;
  changeValue: (value: string, focus?: boolean) => void;

  selecting: DataState<boolean>;
  focused: DataState<boolean>;

  rootRef: Component;
  triggerRef: Component;
  itemsRefs: Component[];
  valueRef: Component;
  contentRef: Component;
}
