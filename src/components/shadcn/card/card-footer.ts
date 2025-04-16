import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";

const SHADCN_CARD_FOOTER_CLASS = ' p-6 pt-0 flex justify-between items-center';

export const ShadcnCardFotterPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-card-footer`,
  setup: (p) => {
  
    return {
      render: () => {
        const root = p.view.getElement();
        const className = root.className || '';
        root.className = [SHADCN_CARD_FOOTER_CLASS, className].join(' ').trimEnd();
      }
    };
  },
})

export const ShadcnCardFooter = WebComponentAdapter(ShadcnCardFotterPrototype);
