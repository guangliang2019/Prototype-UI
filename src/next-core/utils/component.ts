import { Component } from '../adapter/interface';

/**
 * 组件标识符
 * 使用 Symbol 确保不会与其他框架的属性冲突
 */
export const COMPONENT_SYMBOL = Symbol.for('prototype-ui.component');

/**
 * 扩展的 Element 接口，包含组件引用
 */
export interface ComponentElement extends HTMLElement {
  [COMPONENT_SYMBOL]?: Component;
}

/**
 * 将组件实例关联到元素
 * @param element 目标元素
 * @param component 组件实例
 */
export function attachComponent(element: Element, component: Component): void {
  if (element instanceof HTMLElement) {
    (element as ComponentElement)[COMPONENT_SYMBOL] = component;
  }
}

/**
 * 判断一个 Element 是否是某个 Component 的根节点
 * @param element 要检查的元素
 * @returns 如果元素是组件根节点则返回 true，否则返回 false
 */
export function isComponentRoot(element: Element): boolean {
  return element instanceof HTMLElement && 
    COMPONENT_SYMBOL in element &&
    (element as ComponentElement)[COMPONENT_SYMBOL] !== undefined;
}

/**
 * 获取元素关联的组件实例（如果存在）
 * @param element 要检查的元素
 * @returns 如果元素是组件根节点，则返回关联的组件实例，否则返回 null
 */
export function getComponent(element: Element): Component | null {
  if (!(element instanceof HTMLElement)) {
    return null;
  }
  return (element as ComponentElement)[COMPONENT_SYMBOL] || null;
}

/**
 * 移除元素上的组件关联
 * @param element 目标元素
 */
export function detachComponent(element: Element): void {
  if (element instanceof HTMLElement) {
    delete (element as ComponentElement)[COMPONENT_SYMBOL];
  }
} 