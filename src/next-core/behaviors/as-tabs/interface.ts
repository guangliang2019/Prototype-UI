import { createContext } from '@/next-core/adapter/context';

export type TabsProps = {
  readonly defaultValue?: string;
  readonly changTab?: (value: string, focus?: boolean) => void;
  onTabChange: (context: TabsContextType) => void;
}

export type TabsTriggerProps = {
  value: string;
}

export type TabsContentProps = {
  value: string;
}

export type TabsIndicatorProps = {
  onTabChange: (context: TabsContextType) => void;
  onTabResize: (context: TabsContextType) => void;
}

export type TabsContextType = {
  index: number;
  tabValue: string;
  defaultValue: string;
  changeTab: (value: string, focus?: boolean) => void;
  tabs: string[];
  tabRefs: HTMLElement[];
}

export const TabsContext = createContext<TabsContextType>('as-tabs');
