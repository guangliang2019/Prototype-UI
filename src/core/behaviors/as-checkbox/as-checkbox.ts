import { PrototypeAPI } from '@/core/interface';
import { CheckboxProps, CheckboxState, CheckedContextType, CheckboxContext } from './interface';
import { asButton } from '../as-button';

const asCheckbox = (
    p: PrototypeAPI<CheckboxProps>
): {
        states: CheckboxState;
} => {
    asButton(p);
    
}