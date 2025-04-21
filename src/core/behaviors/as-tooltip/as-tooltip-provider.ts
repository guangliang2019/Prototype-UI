import { Prototype, PrototypeAPI } from "@/core/interface";
import { TooltipProviderContent, TooltipProviderContext, TooltipProviderProps, TooltipProviderState } from "./interface";


const asTooltipProvider = (p: PrototypeAPI<TooltipProviderProps>):{ states: TooltipProviderState } => {

  let time:number;
  // context
  p.context.provide(TooltipProviderContext, (updateContext) => {
    const context: TooltipProviderContent = {
      tooltipProviderState: false,
      changeState: (state: boolean) => {
        updateContext({ tooltipProviderState: state});
      }
    };
    return context;
  });

  // 暂时不考虑聚焦的情况

  p.event.on('mouseenter', () => {
    const context= p.context.get(TooltipProviderContext);

    if ( context.tooltipProviderState === false) {
      window.clearTimeout(time);
      time = window.setTimeout(() => {
        context.changeState(true);
      }, 1000); 
    }

  });

  p.event.on('mouseleave', () => {
    const context= p.context.get(TooltipProviderContext);
    window.clearTimeout(time);
    context.changeState(false);

  });

  return {
    states: {
      tooltipProviderState: false,

    }
  }

}

export default asTooltipProvider;