import { PrototypeAPI } from "@/core/interface";
import { TooltipContent, TooltipContext, TooltipExpose, TooltipProviderProps } from "./interface";


const asTooltip = (p: PrototypeAPI<TooltipProviderProps>): { exposes: TooltipExpose} => {
  
  // context
  p.context.provide(TooltipContext, (updateContext) => {

    const context: TooltipContent = {
      tipState: false,
      changeState: (state: boolean) => {
        updateContext({ tipState: state})
      },
    };

    return context;
  });
  return {
    exposes: {
      changeState: (state: boolean) => {
        const context = p.context.get(TooltipContext);
        context.changeState(state);
      },
    },
  };
}

export default asTooltip;