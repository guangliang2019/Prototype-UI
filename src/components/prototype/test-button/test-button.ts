import { asButton } from '@/next-core/behaviors/as-button';
import { TestButtonProps } from './interface';
import { definePrototype, WebComponentAdapter } from '@/next-core';

const ButtonPrototype = definePrototype<TestButtonProps>({}, (hooks) => {
  asButton(hooks);
});

const Button = WebComponentAdapter(ButtonPrototype);

export default Button;

customElements.define('prototype-test-button', Button);
