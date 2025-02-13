import PrototypeTestButton from './test-button';

export interface TestButtonProps {}



export interface PrototypeTestButtonContext extends Record<string, Object> {
  'prototype-test-button': {
    rootRef: PrototypeTestButton<any>;
  };
}
