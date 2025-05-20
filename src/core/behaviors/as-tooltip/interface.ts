import { createContext } from "@/core/adapters/web/context-center";


export interface TooltipRootProps {

}

export interface TooltipProviderProps {

}

export interface TooltipTriggerProps {
  
}

export interface TooltipContentProps {
  
}

export interface TooltipTiggerExpose {

}

export interface TooltipContentExpose {
  
}

export interface TooltipState {
  tipState: boolean;
}

export interface TooltipProviderExposes {
  tooltipProviderState: boolean;

}


export interface TooltipContextType {
  tooltipState: boolean;
  tooltipRefs: HTMLElement[];
  index: number;
  changeState: (state: boolean) => void;
  changeFocus: ( focus: number) => void;
}

export interface TooltipRootContxtType {

  tooltipRootState: 'closed' | 'ready' | 'open';
  changeState: (state: 'closed' | 'ready' | 'open') => void;
}


export interface TooltipExpose {
  changeState: (state: 'closed' | 'ready' | 'open') => void;
  changeFocus: ( focus: number) => void;
}

export const TooltipContext = createContext<TooltipContextType>('as-tooltip-provider');

export const TooltipRootContext = createContext<TooltipRootContxtType>('as-tooltip');