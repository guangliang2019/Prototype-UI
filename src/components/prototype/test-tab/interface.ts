import PrototypeTestTab from './test-tab';

export interface TestTabProps {}

export interface TestTabTriggerProps {}

export interface TestTabContentProps {}

export interface PrototypeTestTabContext extends Record<string, Object> {
  'prototype-test-tab': {
    rootRef: PrototypeTestTab<any>;
  };
}
