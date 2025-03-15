import { EventManager, PropsManager, StateManager } from "./managers";

/**
 * 组件实例接口
 */
export interface Component {
  /**
   * 组件的渲染元素
   */
  readonly element: Element;

  /**
   * 事件管理器
   */
  readonly eventManager: EventManager;

  /**
   * 属性管理器
   */
  readonly props: PropsManager;

  /**
   * 状态管理器
   */
  readonly state: StateManager;

  /**
   * Context 变更回调
   */
  contextChanged?: (key: symbol, value: any, changedKeys: string[]) => void;

  /**
   * 销毁组件
   */
  destroy(): void;
}

/**
 * 组件树遍历器
 * 不同框架可以提供不同的实现
 */
export interface ComponentTreeWalker {
  /**
   * 获取父组件
   */
  getParent(instance: Component): Component | null;

  /**
   * 获取子组件列表
   */
  getChildren(instance: Component): Component[];

  /**
   * 判断是否是组件实例
   */
  isComponent(element: any): element is Component;
}