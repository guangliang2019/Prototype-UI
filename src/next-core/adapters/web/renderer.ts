import {
  ElementType,
  ElementProps,
  RendererAPI,
  RendererContext,
  VirtualElement,
  Component,
  Prototype,
  ElementChildren,
  ElementChild,
} from '../../interface';
import { EventHandler } from '../../interface/managers';

/**
 * 基础渲染器实现
 */
export abstract class BaseRenderer implements RendererAPI {
  public readonly Fragment: symbol = Symbol('Fragment');
  protected readonly context: RendererContext;

  constructor(context: RendererContext) {
    this.context = context;
  }

  createElement(
    type: ElementType,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement {
    // 根据类型分发到不同的创建方法
    if (typeof type === 'string') {
      return this.createNativeElement(type, props, children);
    } else if (type === this.Fragment) {
      return this.createFragment(props, children);
    } else if (this.isPrototype(type)) {
      return this.createFromPrototype(type, props, children);
    } else if (this.isComponent(type)) {
      return this.createFromComponent(type, props, children);
    }

    throw new Error(`不支持的元素类型: ${String(type)}`);
  }

  abstract createText(content: string): Text | VirtualElement;
  abstract createComment(content: string): Comment | VirtualElement;

  protected abstract createNativeElement(
    tag: string,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement;

  protected abstract createFragment(
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement;

  protected abstract createFromPrototype(
    prototype: Prototype<any>,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement;

  protected abstract createFromComponent(
    component: Component,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement;

  protected isPrototype(type: any): type is Prototype<any> {
    return type && typeof type.setup === 'function';
  }

  protected isComponent(type: any): type is Component {
    return type && typeof type.render === 'function';
  }

  protected isVirtualElement(child: ElementChild): child is VirtualElement {
    return (
      child !== null &&
      typeof child === 'object' &&
      'type' in child &&
      'props' in child &&
      'children' in child
    );
  }

  protected applyProps(element: Element, props: ElementProps): void {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'on' && typeof value === 'object' && value !== null) {
        // 事件处理
        const eventMap = value as Record<string, EventHandler | EventHandler[]>;
        Object.entries(eventMap).forEach(([eventName, handler]) => {
          if (Array.isArray(handler)) {
            handler.forEach((h: EventHandler) => this.context.eventManager.on(eventName, h));
          } else {
            this.context.eventManager.on(eventName, handler);
          }
        });
      } else if (key === 'hook' && typeof value === 'object' && value !== null) {
        // 生命周期钩子
        const hookMap = value as Record<string, () => void>;
        Object.entries(hookMap).forEach(([hookName, callback]) => {
          if (typeof callback === 'function') {
            this.context.lifecycleManager.add(hookName, callback);
          }
        });
      } else if (key === 'style' && typeof value === 'object' && value !== null) {
        // 样式处理
        const styleMap = value as Record<string, string | number>;
        Object.entries(styleMap).forEach(([prop, val]) => {
          this.context.attributeManager.watch(`style.${prop}`, () => {
            (element as HTMLElement).style[prop as any] = String(val);
          });
        });
      } else if (key === 'class') {
        // 类名处理
        this.applyClass(element, value);
      } else {
        // 其他属性
        this.context.attributeManager.watch(key, () => {
          if (value != null) {
            element.setAttribute(key, String(value));
          } else {
            element.removeAttribute(key);
          }
        });
      }
    });
  }

  protected applyClass(element: Element, value: ElementProps['class']): void {
    if (typeof value === 'string') {
      this.context.attributeManager.watch('class', () => {
        element.className = value;
      });
    } else if (Array.isArray(value)) {
      this.context.attributeManager.watch('class', () => {
        element.className = value
          .map((item) => this.normalizeClass(item))
          .filter(Boolean)
          .join(' ');
      });
    } else if (typeof value === 'object') {
      this.context.attributeManager.watch('class', () => {
        element.className = Object.entries(value)
          .filter(([_, active]) => active)
          .map(([name]) => name)
          .join(' ');
      });
    }
  }

  protected normalizeClass(value: string | Record<string, boolean>): string {
    if (typeof value === 'string') {
      return value;
    }
    return Object.entries(value)
      .filter(([_, active]) => active)
      .map(([name]) => name)
      .join(' ');
  }

  protected appendChildren(parent: Element, children: ElementChildren[] | undefined): void {
    if (!children) return;

    children.flat().forEach((child) => {
      if (child != null) {
        const childElement = this.isVirtualElement(child)
          ? this.createElement(child.type, child.props, child.children)
          : this.createText(String(child));
        parent.appendChild(childElement as Node);
      }
    });
  }
}

// 添加类型断言函数，帮助处理特定类型的属性
// function isEventMap(value: unknown): value is Record<string, EventHandler | EventHandler[]> {
//   return typeof value === 'object' && value !== null;
// }

// function isHookMap(value: unknown): value is Record<string, () => void> {
//   return typeof value === 'object' && value !== null;
// }

// function isStyleMap(value: unknown): value is Record<string, string | number> {
//   return typeof value === 'object' && value !== null;
// }
