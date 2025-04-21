import { PrototypeAPI } from "@/core/interface";
import { TooltipContext, TooltipProviderContext, TooltipProviderProps } from "./interface";

const asTooltipContent = (p: PrototypeAPI<TooltipProviderProps>) => {
  
  const state = p.state.define<'active' | 'inactive'>('inactive', 'data-state');
  p.context.watch(TooltipProviderContext, (context, keys) => {
    
  })
  p.context.watch(TooltipContext, (context, keys) => {
    if (context.tipState) {
      state.set('active'); 

    } else {
      state.set('inactive');
    }
  })

    p.event.on('mouseenter', () => {
      const context = p.context.get(TooltipContext);
      context.changeState(true);

  
    })
  
    p.event.on('mouseleave', () => {
      const context = p.context.get(TooltipContext);
      context.changeState(false);
    })
  
}

export default asTooltipContent;