import { definePrototype, WebComponentAdapter } from "@/core";
import { CONFIG } from "../_config";
import { asTooltipContent, TooltipContentProps, TooltipProviderProps } from "@/core/behaviors/as-tooltip";


const borderCls = 'border border-black ';
const backgroundCls = 'bg-black'
const shapeCls = 'rounded-[4px] shadow-md';
const sizeCls = ' min-w-[30px]';
const textCls = 'text-white text-[15px]'
const flexCls = 'flex flex-col';
const selectCls = 'select-none';
const positionCls = 'px-[15px] py-[10px] absolute top-8 -left-5 '; // 添加transform样式
const SHADCN_TOOLTIP_CONTENT_CLASS = [
  borderCls,
  backgroundCls,
  selectCls,
  flexCls,
  textCls,
  shapeCls,
  positionCls,
  sizeCls
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

      const tooltipElement = p.view.getElement().getBoundingClientRect();
      console.log('tooltipElement',tooltipElement);

    });



    return () => {
      p.view.getElement().className = [_originalCls,SHADCN_TOOLTIP_CONTENT_CLASS ,'data-[state=inactive]:hidden']
      .join(' ')
      .trimEnd();

    }
  }


});

export const ShadcnTooltipContent = WebComponentAdapter(ShadcnTooltipContentPrototype);