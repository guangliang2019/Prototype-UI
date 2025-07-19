import { EventHandler, EventOptions } from '@/core/interface';

export interface EventItem {
  handler: EventHandler;
  options: EventOptions;
}

export interface PendingEvent<T = any> {
  eventName: string;
  detail: T;
}

export interface PendingListener {
  eventName: string;
  item: EventItem;
}

/**
 * 需要代理的基础交互属性
 */
export const INTERACTIVE_ATTRIBUTES = ['tabIndex', 'disabled', 'contentEditable', 'draggable'] as const;

/**
 * 需要代理的 ARIA 状态属性
 * 这些属性描述了元素的交互状态，应该跟随实际的交互元素
 */
export const ARIA_STATE_ATTRIBUTES = [
  'aria-pressed',
  'aria-expanded',
  'aria-selected',
  'aria-checked',
  'aria-disabled',
  'aria-hidden',
  'aria-invalid',
] as const;

/**
 * 不需要代理的 ARIA 关系属性
 * 这些属性描述了组件间的逻辑关系，应该保持在原始元素上
 */
export const ARIA_RELATION_ATTRIBUTES = [
  'aria-controls',
  'aria-owns',
  'aria-describedby',
  'aria-labelledby',
  'aria-details',
] as const;

/**
 * 需要根据上下文决定是否代理的 ARIA 属性
 * 这些属性可能需要特殊处理
 */
export const ARIA_CONTEXT_ATTRIBUTES = [
  'aria-label', // 可能需要保留在原始元素上作为组件描述
  'aria-description', // 可能需要保留在原始元素上作为组件描述
] as const;

/**
 * 需要同步的样式属性列表
 */
export const INTERACTIVE_STYLES = ['pointerEvents', 'userSelect', 'cursor'] as const;

/**
 * 标准 DOM 事件列表
 */
export const STANDARD_DOM_EVENTS = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mousemove',
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
  'keydown',
  'keyup',
  'keypress',
  'focus',
  'blur',
  'change',
  'input',
  'submit',
  'reset',
  'touchstart',
  'touchend',
  'touchmove',
  'touchcancel',
  'scroll',
  'resize',
  'wheel',
  'scrollend',
  'scrollstart',
  'scrollend',
  'pointerdown',
  'pointerup',
  'pointermove',
  'pointercancel',
  'pointerleave',
  'pointerenter',
  'pointerover',
  'pointerout',
  'pointerover',
] as const;