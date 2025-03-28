import { asButton } from '@/next-core/behaviors/as-button/as-button';
import { TestButtonProps } from './interface';
import { definePrototype, WebComponentAdapter } from '@/next-core';

const Button = WebComponentAdapter(
  definePrototype<TestButtonProps>({
    displayName: 'prototype-test-button',
    setup: (hooks) => {
      console.log('ButtonPrototype', hooks, 'setup');
      asButton(hooks);
    },
  })
);

export default Button;

customElements.define('prototype-test-button', Button);
