import { createContext } from '@/core';
import {
  SelectProps,
  SelectContentProps,
  SelectItemProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentExposes,
} from '@/core/behaviors/as-select';
import { TransitionExposes, TransitionProps } from '@/core/behaviors/as-transition';

export interface ShadcnSelectProps extends SelectProps {}

export interface ShadcnSelectContentProps extends SelectContentProps, TransitionProps {}
export interface ShadcnSelectContentExposes extends SelectContentExposes, TransitionExposes {}

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
