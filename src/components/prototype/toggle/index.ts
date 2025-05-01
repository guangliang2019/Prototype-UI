import { definePrototype, WebComponentAdapter } from '@/core';
import { asToggle, ToggleExposes, ToggleProps } from '@/core/behaviors/as-toggle'

export const PrototypeToggle = WebComponentAdapter(
    definePrototype<ToggleProps, ToggleExposes>({
        name: 'prototype-toggle',
        setup: (p) => {
            asToggle(p);
        },
    })
);
