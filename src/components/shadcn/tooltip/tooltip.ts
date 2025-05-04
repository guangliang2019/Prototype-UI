import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipRoot,TooltipExpose, TooltipRootProps } from "@/core/behaviors/as-tooltip";


const SHADCN_TOOLTIP_CONTENT_CLASS = 'relative';

export const ShadcnTooltipPrototype = definePrototype<TooltipRootProps,TooltipExpose>({
  name: `${CONFIG.shadcn.prefix}-tooltip`,
  setup: (p) => {
    asTooltipRoot(p);

    return () => {
      const root = p.view.getElement();
      const className = root.className || "";
      root.className = [SHADCN_TOOLTIP_CONTENT_CLASS, className].join(' ').trimEnd();
    };
  },


})

export const ShadcnTooltip = WebComponentAdapter(ShadcnTooltipPrototype);