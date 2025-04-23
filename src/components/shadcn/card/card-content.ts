import { definePrototype, WebComponentAdapter } from '@/core';
import { CONFIG } from '../_config';

const SHADCN_CARD_CONTENT_CLASS = 'p-6 pt-0';
export const ShadcnCardContentPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-card-content`,
  setup: (p) => {
    return () => {
      const root = p.view.getElement();
      const className = root.className || '';
      root.className = [SHADCN_CARD_CONTENT_CLASS, className].join(' ').trimEnd();
    };
  },
});

export const ShadcnCardContent = WebComponentAdapter(ShadcnCardContentPrototype);
