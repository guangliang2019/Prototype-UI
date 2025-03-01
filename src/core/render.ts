import { canUseHooksFlag } from './constants';
import { Prototype } from './interface';

export const requestRender = async (p: Prototype) => {
  if (p?.[canUseHooksFlag]) {
    p.componentRef.render();
  } else {
    throw new Error('requestRender can only be used inside defineComponent');
  }
};

export const forceRender = async (p: Prototype) => {
  if (p?.[canUseHooksFlag]) {
    p.componentRef.render();
  } else {
    throw new Error('forceRender can only be used inside defineComponent');
  }
};
