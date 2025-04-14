import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";

const SHADCN_CARD_DESCRIPTION_CLASS = 'text-sm text-muted-foreground '

export const ShadcnCardDescriptionPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-card-description`,
  setup: (p) => {
      
      return {
        render: () => {
          const root = p.view.getElement();
          const className = root.className || '';
          root.className = [SHADCN_CARD_DESCRIPTION_CLASS, className].join(' ').trimEnd();
        },
      };
  }
});

export const ShadcnCardTitle = WebComponentAdapter(ShadcnCardDescriptionPrototype);