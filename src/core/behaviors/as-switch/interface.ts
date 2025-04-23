import { State } from '@/core/interface';
import { ButtonExposes, ButtonProps } from '../as-button';
import { createContext } from '@/core/adapters/web/context-center';

export interface SwitchProps extends ButtonProps {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

export interface SwitchExposes extends ButtonExposes {}

export interface SwitchState {
  checked: State<boolean>;
}

export interface SwitchContextType {
  checked: State<boolean>;
  disabled: State<boolean>;
}

export const SwitchContext = createContext<SwitchContextType>('switch');

export const DEFAULT_SWITCH_PROPS: SwitchProps = { checked: false, onChange: () => {} };
