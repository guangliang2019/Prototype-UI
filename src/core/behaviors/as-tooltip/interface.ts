import { createContext } from "@/core/adapters/web/context-center";


export interface TooltipContentProps {

}

export interface TooltipExpose {
  // changeState: (hover: boolean) => void;
}

export interface TooltipProviderProps {
  // readonly defaultState?: boolean; 
  // onTooltipTime: (context: TooltipContentType) => void;
}

export interface TooltipState {
  tipState: boolean;
}

export interface TooltipProviderState {
  tooltipProviderState: boolean;
}


export interface TooltipProviderContent {
  tooltipProviderState: boolean;
  changeState: (state: boolean) => void;
}

export interface TooltipContent {
  tipState: boolean;
  changeState: (state: boolean) => void;
}

export interface TooltipExpose {
  changeState: (state: boolean) => void;
}

export const TooltipProviderContext = createContext<TooltipProviderContent>('as-tooltip-provider');

export const TooltipContext = createContext<TooltipContent>('as-tooltip');