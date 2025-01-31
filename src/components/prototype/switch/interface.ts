import PrototypeSwitch from './switch';

export interface SwitchProps {}



export interface PrototypeSwitchContext extends Record<string, Object> {
  'prototype-switch': {
    rootRef: PrototypeSwitch<any>;
  };
}
