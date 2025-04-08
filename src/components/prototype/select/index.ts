import { definePrototype, WebComponentAdapter } from '@/next-core';
import {
  asSelect,
  asSelectContent,
  asSelectItem,
  asSelectTrigger,
  asSelectValue,
} from '@/next-core/behaviors/as-select';

export const PrototypeSelect = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-select',
    setup: asSelect,
  })
);
export const PrototypeSelectTrigger = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-select-trigger',
    setup: asSelectTrigger,
  })
);
export const PrototypeSelectContent = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-select-content',
    setup: asSelectContent,
  })
);
export const PrototypeSelectItem = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-select-item',
    setup: asSelectItem,
  })
);
export const PrototypeSelectValue = WebComponentAdapter(
  definePrototype({
    displayName: 'prototype-select-value',
    setup: asSelectValue,
  })
);

customElements.define('prototype-select', PrototypeSelect);
customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
customElements.define('prototype-select-content', PrototypeSelectContent);
customElements.define('prototype-select-item', PrototypeSelectItem);
customElements.define('prototype-select-value', PrototypeSelectValue);
