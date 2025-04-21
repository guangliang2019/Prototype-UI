import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipTrigger, TooltipProviderProps } from "@/core/behaviors/as-tooltip";


export const ShadcnTooltipTriggerPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-tooltip-trigger`,
  setup: asTooltipTrigger,


});

export const ShadcnTooltipTrigger = WebComponentAdapter(ShadcnTooltipTriggerPrototype);