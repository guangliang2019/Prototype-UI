import { definePrototype, WebComponentAdapter } from '@/next-core';
import { asButton } from '@/next-core/behaviors/as-button';

export const PrototypeButton = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-button',
    setup: asButton,
  })
);

customElements.define('prototype-button', PrototypeButton);
