import { PrototypeAPI } from "@/core/interface";
import {  TooltipContext, TooltipProviderContext, TooltipProviderProps, TooltipState } from "./interface";


const asTooltipTrigger = (p: PrototypeAPI<TooltipProviderProps>) => {
  
  // p.role.asTrigger();
  // 这里需要再次判断，因为在鼠标可能会到content上去之后离开。
  p.context.watch(TooltipContext, (context, keys) => {

  })

  p.context.watch(TooltipProviderContext, (context, keys) => {
      if ( context.tooltipProviderState === true){
        const context = p.context.get(TooltipContext);
        context.changeState(true);
      }
  })

  p.event.on('mouseenter', () => {
    const tooltipproviderContext = p.context.get(TooltipProviderContext);
    if ( tooltipproviderContext.tooltipProviderState === true){
      const context = p.context.get(TooltipContext);
      context.changeState(true);
    }

  })

  p.event.on('mouseleave', () => {
    const context = p.context.get(TooltipContext);
    context.changeState(false);
  })


  
}

export default asTooltipTrigger;