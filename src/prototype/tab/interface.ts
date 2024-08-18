export interface TabProps {
  readonly defaultValue?: string;
}

export interface TabTrigerProps {
  readonly value: string;
}

export interface TabContentProps {
  readonly value: string;
}

export interface TabIndicatorProps {
  onTabChange: (context: TabContext) => void;
  onTabResize: (context: TabContext) => void;
}

export interface TabContext {
  readonly index: number;
  readonly tabValue: string;
  readonly defaultValue: string;
  readonly changeTab: (value: string, focus?: boolean) => void;
  readonly tabs: string[];
  readonly tabRefs: HTMLElement[];
}