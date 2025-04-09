import { definePrototype, WebComponentAdapter } from '@/core';
import {
  asSelect,
  asSelectContent,
  asSelectItem,
  asSelectTrigger,
  asSelectValue,
} from '@/core/behaviors/as-select';

export const PrototypeSelect = WebComponentAdapter(
  definePrototype({
    name: 'prototype-select',
    setup: asSelect,
  })
);
export const PrototypeSelectTrigger = WebComponentAdapter(
  definePrototype({
    name: 'prototype-select-trigger',
    setup: asSelectTrigger,
  })
);
export const PrototypeSelectContent = WebComponentAdapter(
  definePrototype({
    name: 'prototype-select-content',
    setup: asSelectContent,
  })
);
export const PrototypeSelectItem = WebComponentAdapter(
  definePrototype({
    name: 'prototype-select-item',
    setup: asSelectItem,
  })
);
export const PrototypeSelectValue = WebComponentAdapter(
  definePrototype({
    name: 'prototype-select-value',
    setup: asSelectValue,
  })
);
