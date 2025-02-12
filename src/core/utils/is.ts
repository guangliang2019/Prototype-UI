import { canUseHooksFlag } from '../constants';
import { Component, Prototype } from '../interface';

export const isPrototype = (value: any): value is Prototype => {
  return value?.[canUseHooksFlag] === true;
};

export const isComponent = (value: any): value is Component => {
  return Boolean(value?.prototypeRef);
};
