export interface TabsProps {
  readonly defaultValue?: string;
  readonly changTab?: (value: string, focus?: boolean) => void;
  onTabChange: (context: PrototypeTabsContext['prototype-tabs']) => void;
}

export interface TabsTriggerProps {
  readonly value: string;
}

export interface TabsContentProps {
  readonly value: string;
}

export interface TabsIndicatorProps {
  onTabChange: (context: PrototypeTabsContext['prototype-tabs']) => void;
  onTabResize: (context: PrototypeTabsContext['prototype-tabs']) => void;
}

export interface PrototypeTabsContext extends Record<string, Object> {
  'prototype-tabs': {
    readonly index: number;
    readonly tabValue: string;
    readonly defaultValue: string;
    readonly changeTab: (value: string, focus?: boolean) => void;
    readonly tabs: string[];
    readonly tabRefs: HTMLElement[];
  };
  [key: string]: Object;
}
