export interface MotionScrollContext extends Record<string, Object> {
  'motion-scroll': {
    scrollY: number;
    scrollX: number;

    viewportHeight: number;
    viewportWidth: number;
    contentHeight: number;
    contentWidth: number;

    contentRef: HTMLElement;
    viewportRef: HTMLElement;
  };
}
