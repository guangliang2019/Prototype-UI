import { SwitchProps } from '@/core/behaviors/as-switch';
import { createContext } from '@/core';

export interface ShadcnSwitchProps extends SwitchProps {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    autoFocus?: boolean;
    className?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    value?: string;
}

export type ShadcnSwitchContextType = {
    thumbRef: HTMLElement | null;
    updateRef: (name: 'thumbRef', ref: HTMLElement) => void;
};

export const ShadcnSwitchContext = createContext<ShadcnSwitchContextType>('shadcn-switch-context');

export const SHADCN_SWITCH_DEFAULT_PROPS: Partial<ShadcnSwitchProps> = {
    disabled: false,
    value: 'on',
};
