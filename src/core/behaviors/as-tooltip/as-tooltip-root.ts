import { PrototypeAPI } from "@/core/interface";
import { TooltipRootContext, TooltipContext,TooltipRootContxtType, TooltipExpose, TooltipRootProps } from "./interface";


const asTooltipRoot = <Prosp extends TooltipRootProps=TooltipRootProps,
 Exposes extends TooltipExpose = TooltipExpose> (p: PrototypeAPI<Prosp,Exposes>) => {
  
  // context
  p.context.provide(TooltipRootContext, (updateContext) => {

    const context: TooltipRootContxtType = {
      tooltipRootState: 'closed',
      changeState: (state: 'closed' | 'ready' | 'open') => {
        updateContext({ tooltipRootState: state})
      },
    };
    return context;
  });

  p.context.watch(TooltipContext, (context, keys) => {
      const tooltipRootcontext = p.context.get(TooltipRootContext);
      if ( context.tooltipState === true && tooltipRootcontext.tooltipRootState === 'ready'){
        tooltipRootcontext.changeState('open');
      }
  })
  // 鼠标进入
  p.event.on('mouseenter', () => {
    const tooltipContext = p.context.get(TooltipContext);
    const context = p.context.get(TooltipRootContext);
    context.changeState('ready');
    if ( tooltipContext.tooltipState === true && context.tooltipRootState === 'ready'){

      context.changeState('open');
    }

  })
  // 鼠标离开
  p.event.on('mouseleave', () => {
    const context = p.context.get(TooltipRootContext);
    context.changeState('closed');
  })

  p.expose.define('changeState', (state: 'closed' |'ready' | 'open') => {
    const context = p.context.get(TooltipRootContext);
    context.changeState(state);
  });


}

export default asTooltipRoot;