// 1. 定义元素位置关系枚举
export enum ElementPosition {
  /** a 在 b 之前 */
  BEFORE = Node.DOCUMENT_POSITION_FOLLOWING,
  /** a 在 b 之后 */
  AFTER = Node.DOCUMENT_POSITION_PRECEDING,
  /** a 和 b 是同一个元素 */
  SAME = 0,
  /** a 在 b 内部 */
  INSIDE = Node.DOCUMENT_POSITION_CONTAINED_BY,
  /** b 在 a 内部 */
  CONTAINS = Node.DOCUMENT_POSITION_CONTAINS,
  /** a 和 b 不在同一 Element 体系下 */
  DISJOINT = Node.DOCUMENT_POSITION_DISCONNECTED,
  /** 存在非法输入 */
  INVALID = -1,
}

export interface ElementCommands {
  /**
   * 获取当前组件对应的元素
   * 注意：此方法只能在 mounted 之后的生命周期中使用
   */
  get(): HTMLElement;

  /**
   * 比较两个元素在文档中的相对位置关系
   * @param a 第一个元素
   * @param b 第二个元素
   * @returns 元素位置关系
   */
  comparePosition(a: HTMLElement, b?: HTMLElement): ElementPosition;

  /**
   * 获取元素在指定列表中的当前位置
   * @param list 目标列表
   * @param element 元素
   * @returns 元素在列表中的当前位置
   */
  getListIndex(list: HTMLElement[], element?: HTMLElement): number;
}
