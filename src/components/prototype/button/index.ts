import { definePrototype, WebComponentAdapter } from '@/core';
import { asButton, ButtonProps } from '@/core/behaviors/as-button';

export const PrototypeButton = WebComponentAdapter<ButtonProps>(
  definePrototype({
    name: 'prototype-button',
    setup: asButton,
  })
);
