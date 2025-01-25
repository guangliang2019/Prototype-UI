import PrototypeRadioGroup from './radio-group';

export interface RadioGroupProps {}

export interface RadioGroupItemProps {}

export interface PrototypeRadioGroupContext extends Record<string, Object> {
  'prototype-radio-group': {
    rootRef: PrototypeRadioGroup<any>;
  };
}
