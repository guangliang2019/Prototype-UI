import asButton from '@/next-core/behaviors/as-button/as-button';
import { definePrototype, WebComponentAdapter } from '@/next-core';

const Button = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-test-button',
    setup: asButton,
  })
);

export default Button;

customElements.define('prototype-test-button', Button);
