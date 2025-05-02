import { CheckboxProps } from '@/core/behaviors/as-checkbox';
import { createContext } from '@/core';

export interface ShadcnCheckboxProps extends CheckboxProps {
  // 无障碍属性
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;

  // 基础属性
  id?: string;
  name?: string;
  value?: string;
  className?: string;

  // 状态属性
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;

  // 焦点属性
  autoFocus?: boolean;

  // 事件回调
  onCheckedChange?: (checked: boolean) => void;
}

export type ShadcnCheckboxContextType = {
  indicatorRef: HTMLElement | null;
  updateRef: (name: 'indicatorRef', ref: HTMLElement) => void;
};

export const ShadcnCheckboxContext =
  createContext<ShadcnCheckboxContextType>('shadcn-checkbox-context');

export const SHADCN_CHECKBOX_DEFAULT_PROPS: Partial<ShadcnCheckboxProps> = {
  disabled: false,
  required: false,
  value: 'on',
};
