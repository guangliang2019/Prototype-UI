import { canUseHooksFlag } from "../constants";
import { Component } from "../interface";

export const isComponent = (value: any): value is Component<any> => {
  return value?.[canUseHooksFlag] === true;
};