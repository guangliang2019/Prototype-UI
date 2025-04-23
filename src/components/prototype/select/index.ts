import { definePrototype, WebComponentAdapter } from '@/core';
import {
  asSelect,
  asSelectContent,
  asSelectItem,
  asSelectTrigger,
  asSelectValue,
  SelectContentProps,
  SelectContentExposes,
  SelectItemExposes,
  SelectItemProps,
  SelectTriggerExposes,
  SelectTriggerProps,
  SelectValueExposes,
  SelectValueProps,
} from '@/core/behaviors/as-select';

export const PrototypeSelect = WebComponentAdapter(
  definePrototype({
    name: 'prototype-select',
    setup: (p) => {
      asSelect(p);
    },
  })
);
export const PrototypeSelectTrigger = WebComponentAdapter(
  definePrototype<SelectTriggerProps, SelectTriggerExposes>({
    name: 'prototype-select-trigger',
    setup: (p) => {
      asSelectTrigger(p);
    },
  })
);
export const PrototypeSelectContent = WebComponentAdapter(
  definePrototype<SelectContentProps, SelectContentExposes>({
    name: 'prototype-select-content',
    setup: (p) => {
      asSelectContent(p);
    },
  })
);
export const PrototypeSelectItem = WebComponentAdapter(
  definePrototype<SelectItemProps, SelectItemExposes>({
    name: 'prototype-select-item',
    setup: (p) => {
      asSelectItem(p);
    },
  })
);
export const PrototypeSelectValue = WebComponentAdapter(
  definePrototype<SelectValueProps, SelectValueExposes>({
    name: 'prototype-select-value',
    setup: (p) => {
      asSelectValue(p);
    },
  })
);
