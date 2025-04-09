import asButton from '@/core/behaviors/as-button/as-button';
import { definePrototype, WebComponentAdapter } from '@/core';

const Button = WebComponentAdapter(
  definePrototype({
    name: 'prototype-test-button',
    setup: asButton,
  })
);

export default Button;
