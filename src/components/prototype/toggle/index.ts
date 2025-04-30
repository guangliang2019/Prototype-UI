import { definePrototype, WebComponentAdapter } from '@/core';
import { asToggle, asToggleContent, ToggleExposes, ToggleProps } from '@/core/behaviors/as-toggle'

export const PrototypeToggle = WebComponentAdapter(
    definePrototype<ToggleProps, ToggleExposes>({
        name: 'prototype-toggle',
        setup: (p) => {
            asToggle(p);
        },
    })
);
export const PrototypeToggleContent = WebComponentAdapter(
    definePrototype({
        name: 'prototype-toggle-content',
        setup: (p) => {
            asToggleContent(p);
        },
    })
);