export interface MotionScrollContext extends Record<string, Object> {
  'motion-scroll': {
    scrollY: number;
    scrollX: number;

    onContentResize: () => void;
    onViewportResize: () => void;

    contentRef: HTMLElement;
    viewportRef: HTMLElement;
  };
}
