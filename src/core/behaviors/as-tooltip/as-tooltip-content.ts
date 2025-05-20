import { PrototypeAPI } from "@/core/interface";
import { TooltipRootContext, TooltipContentExpose, TooltipContentProps } from "./interface";

const asTooltipContent = <
  Props extends TooltipContentProps = TooltipContentProps,
  Exposes extends TooltipContentExpose = TooltipContentExpose
>(
  p: PrototypeAPI<Props,Exposes>
) => {
  
  const state= p.state.define<'closed' | 'delayed-open'| 'instant-open'>('closed', 'data-state');
  p.context.watch(TooltipRootContext, (context, keys) => {
    if (context.tooltipRootState === 'open' ) {
      state.set('delayed-open'); 
    } else {
      state.set('closed');
    }

  })

  const handleDisabledChange = (disabled: boolean) => {
    if (disabled) {
      p.event.focus.setPriority(-1);
      p.event.setAttribute('aria-disabled', 'true');
    } else {
      p.event.focus.setPriority(0);
      p.event.removeAttribute('aria-disabled');
    }
  };
  p.lifecycle.onMounted(() => {
    handleDisabledChange(true);
  })

}

export default asTooltipContent;