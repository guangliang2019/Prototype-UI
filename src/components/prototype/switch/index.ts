import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch, asSwitchThumb } from '@/core/behaviors/as-switch';
import { SwitchExposes, SwitchProps } from '@/core/behaviors/as-switch/interface';

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
