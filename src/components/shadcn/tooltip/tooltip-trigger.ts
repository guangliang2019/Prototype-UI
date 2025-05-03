import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipTrigger, TooltipExpose, TooltipTriggerProps } from "@/core/behaviors/as-tooltip";


export const ShadcnTooltipTriggerPrototype = definePrototype<TooltipTriggerProps,TooltipExpose>({
  name: `${CONFIG.shadcn.prefix}-tooltip-trigger`,
  setup: (p) => {
    asTooltipTrigger(p);
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return () => {
      p.view.getElement().className = [_originalCls]
      .join(' ')
      .trimEnd();

    }
  },


});

export const ShadcnTooltipTrigger = WebComponentAdapter(ShadcnTooltipTriggerPrototype);