import { createContext } from '@/core/adapters/web/context-center';
import { ButtonExposes, ButtonProps } from '../as-button';
import { OverlayExposes, OverlayProps } from '../as-overlay/interface';
import { State } from '@/core/interface';

// 基础 Props 接口
export interface SelectProps {
  defaultValue?: string;
}

export interface SelectValueProps {
  renderValue: (value: string) => HTMLElement | string;
}

// 扩展 Props 接口
export interface SelectTriggerProps extends ButtonProps {}
export interface SelectContentProps extends OverlayProps {}
export interface SelectItemProps extends ButtonProps {
  value: string;
}

// Exposes 接口
export interface SelectExposes {}
export interface SelectTriggerExposes extends ButtonExposes {}
export interface SelectContentExposes extends OverlayExposes {}
export interface SelectItemExposes extends ButtonExposes {}
export interface SelectValueExposes extends ButtonExposes {}

// Context 相关定义
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

// 默认值常量
export const DEFAULT_SELECT_PROPS: SelectProps = {
  defaultValue: '',
};

export const DEFAULT_SELECT_ITEM_PROPS: SelectItemProps = {
  value: ' ',
};