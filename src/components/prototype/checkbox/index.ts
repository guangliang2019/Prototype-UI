import { definePrototype, WebComponentAdapter } from '@/core';
import { asCheckbox, asCheckboxIndicator, CheckboxExposes, CheckboxProps } from '@/core/behaviors/as-checkbox'

export const PrototypeCheckbox = WebComponentAdapter(
    definePrototype<CheckboxProps, CheckboxExposes>({
        name: 'prototype-checkbox',
        setup: (p) => {
            asCheckbox(p);
        },
    })
);
export const PrototypeCheckboxIndicator = WebComponentAdapter(
    definePrototype({
        name: 'prototype-checkbox-indicator',
        setup: (p) => {
            asCheckboxIndicator(p);
        },
    })
);