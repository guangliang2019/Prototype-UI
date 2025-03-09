import { PrototypeHooks } from "../interface";



/**
 * 添加事件监听
 * @param hooks 原型钩子
 * @param eventName 事件名称
 * @param listener 事件监听器
 */
export function useEventListener(
  hooks: PrototypeHooks,
  eventName: string,
  listener: EventListener
): void {
  hooks.useMounted(() => {
    const element = hooks.getInstance();
    element.addEventListener(eventName, listener);
  });

  hooks.useUnmounted(() => {
    const element = hooks.getInstance();
    element.removeEventListener(eventName, listener);
  });
}
