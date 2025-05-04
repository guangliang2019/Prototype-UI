import { PrototypeAPI } from "@/core/interface";
import { TooltipContextType, TooltipContext, TooltipProviderProps, TooltipProviderExposes } from "./interface";


const asTooltipProvider = <Props extends TooltipProviderProps = TooltipProviderProps, 
  Exposes extends TooltipProviderExposes = TooltipProviderExposes>( p: PrototypeAPI<Props,Exposes> ) => {
  let time:number;
  // context
  p.context.provide(TooltipContext, (updateContext) => {
    const context: TooltipContextType = {
      tooltipState: false,
      index: -1,
      tooltipRefs: [],
      changeState: (state: boolean) => {
        updateContext({ tooltipState: state});
      },
      changeFocus: (index: number) => {
        updateContext({ index: index});
        context.tooltipRefs[index].focus();
      },
    };
    return context;
  });


  p.event.on('mouseenter', () => {
    const context= p.context.get(TooltipContext);

    if ( context.tooltipState === false) {
      window.clearTimeout(time);
      time = window.setTimeout(() => {
        context.changeState(true);
      }, 1000); 
    }

  });
  p.event.on('mouseleave', () => {
    const context= p.context.get(TooltipContext);
    window.clearTimeout(time);
    context.changeState(false);
  });


  // exposes
  p.expose.define('tooltipProviderState', false);


}

export default asTooltipProvider;