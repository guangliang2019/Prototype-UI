import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";

const SHADCN_CARD_TITLE_CLASS = 'font-semibold leading-none tracking-tight';

export const ShadcnCardTitlePrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-card-title`,
  setup: (p) => {
    

    return {
      render: () => {
        const root = p.view.getElement();
        const className = root.className || '';
        root.className = [SHADCN_CARD_TITLE_CLASS, className].join(' ').trimEnd();
      }
    }
  }
})

export const ShadcnCardTitle = WebComponentAdapter(ShadcnCardTitlePrototype);