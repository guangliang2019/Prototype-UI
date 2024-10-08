export interface TabProps {
  readonly defaultValue?: string;
  readonly changTab?: (value: string, focus?: boolean) => void;
}

export interface TabTriggerProps {
  readonly value: string;
}

export interface TabContentProps {
  readonly value: string;
}

export interface TabIndicatorProps {
  onTabChange: (context: PrototypeTabContext['prototype-tab']) => void;
  onTabResize: (context: PrototypeTabContext['prototype-tab']) => void;
}

export interface PrototypeTabContext extends Record<string, Object> {
  'prototype-tab': {
    readonly index: number;
    readonly tabValue: string;
    readonly defaultValue: string;
    readonly changeTab: (value: string, focus?: boolean) => void;
    readonly tabs: string[];
    readonly tabRefs: HTMLElement[];
  };
  [key: string]: Object;
}
