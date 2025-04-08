import { createContext } from '@/next-core';
import {
  SelectProps,
  SelectContentProps,
  SelectItemProps,
  SelectTriggerProps,
  SelectValueProps,
} from '@/next-core/behaviors/as-select';

export interface ShadcnSelectProps extends SelectProps {}

export interface ShadcnSelectContentProps extends SelectContentProps {}

export interface ShadcnSelectItemProps extends SelectItemProps {}

export interface ShadcnSelectTriggerProps extends SelectTriggerProps {}

export interface ShadcnSelectValueProps extends SelectValueProps {}
export interface ShadcnSelectContextType {
  arrowRef: HTMLElement;
  checkRef: HTMLElement;
  valueRef: HTMLElement;

  updateRef: (name: 'arrowRef' | 'checkRef' | 'valueRef', ref: HTMLElement) => void;
}

export const ShadcnSelectContext = createContext<ShadcnSelectContextType>('shadcn-select');
