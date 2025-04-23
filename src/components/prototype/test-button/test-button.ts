import asButton from '@/core/behaviors/as-button/as-button';
import { definePrototype, WebComponentAdapter } from '@/core';
import { ButtonExposes, ButtonProps } from '@/core/behaviors/as-button';

const Button = WebComponentAdapter(
  definePrototype<ButtonProps, ButtonExposes>({
    name: 'prototype-test-button',
    setup: (p) => {
      asButton(p);
    },
  })
);

export default Button;
