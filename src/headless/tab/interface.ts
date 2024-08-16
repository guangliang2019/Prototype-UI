export interface TabProps {
  readonly defaultValue?: string;
}

export interface TabTrigerProps {
  readonly value: string;
}

export interface TabContentProps {
  readonly value: string;
}

export interface TabContext {
  readonly tabValue: string;
  readonly changeTab: (value: string) => void;
}
