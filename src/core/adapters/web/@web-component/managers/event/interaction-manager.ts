export class InteractionManager {
  private element: HTMLElement;
  private targetElement: HTMLElement;

  constructor(element: HTMLElement, targetElement: HTMLElement) {
    this.element = element;
    this.targetElement = targetElement;
  }

  /**
   * 聚焦元素
   */
  public focus(): void {
    this.targetElement.focus();
  }

  /**
   * 失焦元素
   */
  public blur(): void {
    this.targetElement.blur();
  }

  /**
   * 点击元素
   */
  public click(): void {
    this.targetElement.click();
  }
} 