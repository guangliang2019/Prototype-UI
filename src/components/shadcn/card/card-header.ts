import { definePrototype, WebComponentAdapter } from '@/core';
import { CONFIG } from '../_config';

const SHADCN_CARD_HEADER_CLASS = 'flex flex-col space-y-1.5 p-6';

export const ShadcnCardHeaderPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-card-header`,
  setup: (p) => {
    return () => {
      const root = p.view.getElement();
      const className = root.className || '';

      root.className = [SHADCN_CARD_HEADER_CLASS, className].join(' ').trimEnd();
    };
  },
});

export const ShadcnCardHeader = WebComponentAdapter(ShadcnCardHeaderPrototype);
