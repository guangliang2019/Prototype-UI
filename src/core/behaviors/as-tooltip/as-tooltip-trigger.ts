import { PrototypeAPI } from "@/core/interface";
import {  
  TooltipContextType, 
  TooltipRootContext, 
  TooltipTriggerProps,
  TooltipTiggerExpose,
  TooltipContext,
} from "./interface";


const asTooltipTrigger = <Props extends TooltipTriggerProps=TooltipTriggerProps,
  Exposes extends TooltipTiggerExpose =TooltipTiggerExpose
>(p: PrototypeAPI<Props,Exposes>) => {
  p.role.asTrigger();
  // 状态管理
  const state = p.state.define<'closed' | 'delayed-open' | 'instant-open'>('closed', 'data-state');

 // context
  const _handleDisabledChange = (context: TooltipContextType) => {
    const currentIndex = context.tooltipRefs.indexOf(p.view.getElement());
    if (context.index === currentIndex) {
      p.event.focus.setPriority(0);
      state.set('instant-open');
      if (context.index === -1) context.index = currentIndex;
    } else {
      p.event.focus.setPriority(-1);
      state.set('closed');
    }
  };


  p.context.watch(TooltipContext, (context, keys) => {
    if (keys.includes('index')) {
      _handleDisabledChange(context);
    }
  })

  p.context.watch(TooltipRootContext, (context, keys) => {
    if (context.tooltipRootState === 'open') {
      state.set('delayed-open'); 
    }else {
      state.set('closed');
    }
  })
  
  p.lifecycle.onMounted(() => {
    const context = p.context.get(TooltipContext);
    const insertIndex = p.view.insertElement(context.tooltipRefs);
    const currentIndex = context.tooltipRefs.indexOf(p.view.getElement());
    if (context.index === -1 ) { 
      context.index = currentIndex;
    }
    _handleDisabledChange(context);
  })

  p.event.on('focus', () => {
    console.log('2');
    const tooltipRootcontext = p.context.get(TooltipRootContext);
    tooltipRootcontext.changeState('open');

  })
  p.event.on('blur', () => {
    const tooltipRootcontext = p.context.get(TooltipRootContext);
    tooltipRootcontext.changeState('closed');
  })
  p.event.on('keydown', (e) => {
    const event = e as KeyboardEvent;
    const context = p.context.get(TooltipContext);
    const currentIndex = context.tooltipRefs.indexOf(p.view.getElement());

    const nextIndex = (currentIndex + 1) % context.tooltipRefs.length;
    const prevIndex = (currentIndex - 1 + context.tooltipRefs.length) % context.tooltipRefs.length;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
     event.preventDefault();
     context.changeFocus(nextIndex);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      context.changeFocus(prevIndex);
     }
  })

}

 

export default asTooltipTrigger;