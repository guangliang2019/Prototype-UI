import { definePrototype } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { asButton } from '@/core/components/button';

export const PrototypeButton = WebComponentAdapter(definePrototype(asButton));

customElements.define('prototype-button', PrototypeButton);
