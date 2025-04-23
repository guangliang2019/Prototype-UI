import { createContext } from '@/core/adapters/web/context-center';

export interface TabsProps {
  readonly defaultValue?: string;
  onTabChange: (context: TabsContextType) => void;
}

export interface TabsExposes {
  changeTab: (value: string, focus?: boolean) => void;
}

export interface TabsTriggerProps {
  value: string;
}
export interface TabsTriggerExposes {}

export interface TabsContentProps {
  value: string;
}
export interface TabsContentExposes {}

export interface TabsIndicatorProps {
  onTabChange: (context: TabsContextType) => void;
  onTabResize: (context: TabsContextType) => void;
}
export interface TabsIndicatorExposes {}

export interface TabsContextType {
  index: number;
  tabValue: string;
  defaultValue: string;
  changeTab: (value: string, focus?: boolean) => void;
  tabs: string[];
  tabRefs: HTMLElement[];
}

export const TabsContext = createContext<TabsContextType>('as-tabs');

export const DEFAULT_TABS_INDICATOR_PROPS: TabsIndicatorProps = {
  onTabChange: () => {},
  onTabResize: () => {},
};

export const DEFAULT_TABS_CONTENT_PROPS: TabsContentProps = {
  value: '',
};

export const DEFAULT_TABS_TRIGGER_PROPS: TabsTriggerProps = {
  value: '',
};

export const DEFAULT_TABS_PROPS: TabsProps = {
  defaultValue: '',
  onTabChange: () => {},
};