import { ToggleProps } from '@/core/behaviors/as-toggle';
import { createContext } from '@/core';

export interface ShadcnToggleProps extends ToggleProps {
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
    pressed?: boolean;
    defaultPressed?: boolean;
    disabled?: boolean;
    required?: boolean;

    // 焦点属性
    autoFocus?: boolean;

    // 事件回调
    onPressedChange?: (pressed: boolean) => void;
}

export type ShadcnToggleContextType = {
    toggleRef: HTMLElement | null;
    updateRef: (name: 'toggleRef', ref: HTMLElement) => void;
}

export const ShadcnToggleContext = createContext<ShadcnToggleContextType>('shadcn-toggle-context');

export const SHADCN_TOGGLE_DEFAULT_PROPS: Partial<ShadcnToggleProps> = {
    disabled: false,
    required: false,
    value: 'on',
};

