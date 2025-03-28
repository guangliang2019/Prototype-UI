import { createContext } from "@/next-core/adapter/context";

export interface TabsProps {
  readonly defaultValue?: string;
  readonly changTab?: (value: string, focus?: boolean) => void;
  onTabChange: (context: TabsContext) => void;
}

export interface TabsTriggerProps {
  value: string;
}

export interface TabsContentProps {
  value: string;
}

export interface TabsIndicatorProps {
  onTabChange: (context: TabsContext) => void;
  onTabResize: (context: TabsContext) => void;
}

export interface TabsContext {
  index: number;
  tabValue: string;
  defaultValue: string;
  changeTab: (value: string, focus?: boolean) => void;
  tabs: string[];
  tabRefs: HTMLElement[];
}

export const asTabsContext = createContext<TabsContext>('as-tabs');