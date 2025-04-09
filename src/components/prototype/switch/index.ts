import './style.css';
import { definePrototype, WebComponentAdapter } from '@/core';
import { asSwitch } from '@/core/behaviors/as-switch';

export const PrototypeSwitchPrototype = definePrototype({
  name: 'prototype-switch',
  setup: asSwitch,
});

export const PrototypeSwitch = WebComponentAdapter(PrototypeSwitchPrototype);
