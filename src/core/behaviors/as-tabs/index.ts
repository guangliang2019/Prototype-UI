// behaviors
export { default as asTabs } from './as-tabs';
export { default as asTabsTrigger } from './as-tabs-trigger';
export { default as asTabsContent } from './as-tabs-content';
export { default as asTabsIndicator } from './as-tabs-indicator';

// types
export type {
  TabsContextType,
  TabsProps,
  TabsIndicatorProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsExposes,
  TabsIndicatorExposes,
  TabsTriggerExposes,
  TabsContentExposes,
} from './interface';

// context and constants
export {
  TabsContext,
  DEFAULT_TABS_PROPS,
  DEFAULT_TABS_TRIGGER_PROPS,
  DEFAULT_TABS_CONTENT_PROPS,
  DEFAULT_TABS_INDICATOR_PROPS,
} from './interface';
