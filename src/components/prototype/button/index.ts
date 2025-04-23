import { definePrototype, WebComponentAdapter } from '@/core';
import { asButton, ButtonProps, ButtonExposes } from '@/core/behaviors/as-button';

export const PrototypeButton = WebComponentAdapter(
  definePrototype<ButtonProps, ButtonExposes>({
    name: 'prototype-button',
    setup: (p) => {
      asButton(p);
    },
  })
);
