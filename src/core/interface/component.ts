import { ContextManager, EventManager, PropsManager } from './managers';

export const EVENT_MANAGER_SYMBOL = Symbol('eventManager');
export const CONTEXT_MANAGER_SYMBOL = Symbol('contextManager');

// /**
//  * 组件实例接口
//  */
// export interface Component<Props extends {} = {}> {
//   /**
//    * 组件的渲染元素
//    */
//   readonly element: Element;

//   /**
//    * 属性管理器
//    */
//   readonly props: PropsManager<Props>;

//   /**
//    * 上下文管理器
//    */
//   readonly [CONTEXT_MANAGER_SYMBOL]: ContextManager;

//   /**
//    * 事件管理器
//    */
//   readonly [EVENT_MANAGER_SYMBOL]: EventManager;

//   /**
//    * 销毁组件
//    */
//   destroy(): void;
// }
