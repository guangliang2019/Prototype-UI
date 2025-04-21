import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltip } from "@/core/behaviors/as-tooltip";


export const ShadcnTooltipPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-tooltip`,
  setup: asTooltip,
})

export const ShadcnTooltip = WebComponentAdapter(ShadcnTooltipPrototype);