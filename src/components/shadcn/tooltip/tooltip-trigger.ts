import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipTrigger, TooltipExpose, TooltipTriggerProps } from "@/core/behaviors/as-tooltip";


export const ShadcnTooltipTriggerPrototype = definePrototype<TooltipTriggerProps,TooltipExpose>({
  name: `${CONFIG.shadcn.prefix}-tooltip-trigger`,
  setup: (p) => {
    asTooltipTrigger(p);
  },


});

export const ShadcnTooltipTrigger = WebComponentAdapter(ShadcnTooltipTriggerPrototype);