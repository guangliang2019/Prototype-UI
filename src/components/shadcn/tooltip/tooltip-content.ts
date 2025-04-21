import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipContent, TooltipProviderProps } from "@/core/behaviors/as-tooltip";


const borderCls = 'border border-black';
const backgroundCls = 'bg-black'
const shapeCls = 'rounded-xl shadow-md';
const sizeCls = 'w-[20px]';
const textcolrCls = 'text-white'
const flexCls = 'flex flex-col';
const SHADCN_TOOLTIP_CONTENT_CLASS = [
  borderCls,
  backgroundCls,
  flexCls,
  textcolrCls,
  shapeCls,


]
  .join(' ')
  .trimEnd();

export const ShadcnTooltipContentPrototype = definePrototype<TooltipProviderProps>({
  name: `${CONFIG.shadcn.prefix}-tooltip-content`,
  setup: (p) => {
    asTooltipContent(p);
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });
    return {
      render: () => {
        p.view.getElement().className = [_originalCls,SHADCN_TOOLTIP_CONTENT_CLASS ,'data-[state=inactive]:hidden']
        .join(' ')
        .trimEnd();
      },
    }
  }


});

export const ShadcnTooltipContent = WebComponentAdapter(ShadcnTooltipContentPrototype);