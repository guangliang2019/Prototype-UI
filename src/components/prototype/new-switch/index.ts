import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch, asSwitchThumb } from '@/core/behaviors/as-switch';

export const PrototypeSwitch = WebComponentAdapter(
  definePrototype({
    name: 'prototype-new-switch',
    setup: asSwitch,
  })
);
export const PrototypeSwitchThumb = WebComponentAdapter(
  definePrototype({
    name: 'prototype-new-switch-thumb',
    setup: asSwitchThumb,
  })
);

export default PrototypeSwitch;
