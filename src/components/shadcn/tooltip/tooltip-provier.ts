import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipProvider, TooltipProviderProps } from "@/core/behaviors/as-tooltip";
import { TooltipProviderExposes } from "@/core/behaviors/as-tooltip/interface";


export const ShadcnTooltipProvierPrototype = definePrototype<TooltipProviderProps,TooltipProviderExposes>({
  name: `${CONFIG.shadcn.prefix}-tooltip-provider`,
  setup: (p) => { 
    asTooltipProvider(p);
  },


});

export const ShadcnTooltipProvier = WebComponentAdapter(ShadcnTooltipProvierPrototype);