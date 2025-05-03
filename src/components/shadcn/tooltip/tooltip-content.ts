import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipContent, TooltipContentProps, TooltipProviderProps } from "@/core/behaviors/as-tooltip";


const borderCls = 'border';
const colorCls = 'bg-popover text-popover-foreground';
const shapeCls = 'rounded-md shadow-md';
const sizeCls = ' min-w-[8rem] w-auto max-h-96 p-1';
const flexCls = 'flex flex-col ';
const selectCls = 'select-none';
const positionCls = 'absolute z-50 top-6 transform translate-y-2 -translate-x-1/4'; 
const arrowCls = 'before:absolute before:w-0 before:h-0 before:border-l-[5px] before:border-l-transparent before:border-r-[5px] before:border-r-transparent before:border-b-[5px] before:border-b-black before:top-[-5px] before:left-1/2 transform -translate-x-1/2';

const SHADCN_TOOLTIP_CONTENT_CLASS = [
  borderCls,
  selectCls,
  flexCls,
  shapeCls,
  positionCls,
  sizeCls,
  colorCls,
  arrowCls,
]
  .join(' ')
  .trimEnd();

export const ShadcnTooltipContentPrototype = definePrototype<TooltipContentProps>({
  name: `${CONFIG.shadcn.prefix}-tooltip-content`,
  setup: (p) => {
    asTooltipContent(p);
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });



    return () => {
      p.view.getElement().className = [_originalCls,SHADCN_TOOLTIP_CONTENT_CLASS ,'data-[state=inactive]:hidden']
      .join(' ')
      .trimEnd();

    }
  }


});

export const ShadcnTooltipContent = WebComponentAdapter(ShadcnTooltipContentPrototype);