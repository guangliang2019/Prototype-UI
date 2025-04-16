import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";

const flexCls = 'flex flex-col';
const borderCls = 'border';
const shapeCls = 'rounded-xl shadow-md';
const sizeCls = 'w-full';


const SHADCN_CARD_CLASS = [
  shapeCls,
  borderCls,
  flexCls
]
  .join(' ')
  .trimEnd();


export const ShadcnCardPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-card`,
  setup: (p) => {
   

    return {
      render: () => {
        const root = p.view.getElement();
        const className = root.className || '';
        root.className = [SHADCN_CARD_CLASS,className].join(' ').trimEnd();
      },
    };
  },
});

export const ShadcnCard = WebComponentAdapter(ShadcnCardPrototype);