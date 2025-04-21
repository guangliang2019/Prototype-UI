import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipProvider, TooltipProviderProps } from "@/core/behaviors/as-tooltip";


export const ShadcnTooltipProvierPrototype = definePrototype<TooltipProviderProps>({
  name: `${CONFIG.shadcn.prefix}-tooltip-provider`,
  setup: asTooltipProvider,


});

export const ShadcnTooltipProvier = WebComponentAdapter(ShadcnTooltipProvierPrototype);