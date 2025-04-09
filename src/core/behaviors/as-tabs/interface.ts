import { createContext } from '@/core/adapters/web/context-center';

export interface TabsProps {
  readonly defaultValue?: string;
  onTabChange: (context: TabsContextType) => void;
}

export interface TabsExpose {
  changeTab: (value: string, focus?: boolean) => void;
}

export interface TabsTriggerProps {
  value: string;
}

export interface TabsContentProps {
  value: string;
}

export interface TabsIndicatorProps {
  onTabChange: (context: TabsContextType) => void;
  onTabResize: (context: TabsContextType) => void;
}

export interface TabsContextType {
  index: number;
  tabValue: string;
  defaultValue: string;
  changeTab: (value: string, focus?: boolean) => void;
  tabs: string[];
  tabRefs: HTMLElement[];
}

export const TabsContext = createContext<TabsContextType>('as-tabs');
