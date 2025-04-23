import { State } from '@/core/interface';
import { ButtonProps } from '../as-button';
import { createContext } from '@/core/adapters/web/context-center';


export interface CheckboxProps extends ButtonProps {
    onChange?: (checked: boolean) => void;
    checked?: boolean;
}

export interface CheckboxState {
    checked: State<boolean>;
}

export interface CheckedContextType {
    checked: State<boolean>;
    disabled: State<boolean>;
}

export const CheckboxContext = createContext<'CheckedContextType'>('checked')