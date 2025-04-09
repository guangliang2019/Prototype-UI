import { State } from '@/core/interface';
import { ButtonProps } from '../as-button';
import { createContext } from '@/core/adapters/web/context-center';

export interface SwitchProps extends ButtonProps {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

export interface SwitchState {
  checked: State<boolean>;
}

export interface SwitchContextType {
  checked: State<boolean>;
}

export const SwitchContext = createContext<SwitchContextType>('switch');
