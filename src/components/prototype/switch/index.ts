import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch, asSwitchThumb, SwitchExposes, SwitchProps } from '@/core/behaviors/as-switch';

export const PrototypeSwitch = WebComponentAdapter(
  definePrototype<SwitchProps, SwitchExposes>({
    name: 'prototype-switch',
    setup: (p) => {
      asSwitch(p);
    },
  })
);
export const PrototypeSwitchThumb = WebComponentAdapter(
  definePrototype({
    name: 'prototype-switch-thumb',
    setup: (p) => {
      asSwitchThumb(p);
    },
  })
);
