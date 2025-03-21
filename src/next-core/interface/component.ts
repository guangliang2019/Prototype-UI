import { ContextManager, EventManager, PropsManager, StateManager } from './managers';

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
   * 上下文管理器
   */
  readonly context: ContextManager;

  /**
   * Context 变更回调
   */
  contextChanged?: (key: symbol, value: any, changedKeys: string[]) => void;

  /**
   * 销毁组件
   */
  destroy(): void;
}
