import {
  ElementType,
  ElementProps,
  RendererAPI,
  RendererContext,
  Prototype,
  ElementChildren,
} from '../../interface';
import { EventHandler } from '../../interface/managers';

/**
 * 基础渲染器实现
 */
export abstract class BaseRenderer implements RendererAPI {
  protected readonly context: RendererContext;

  constructor(context: RendererContext) {
    this.context = context;
    this.createElement = this.createElement.bind(this);
    this.createText = this.createText.bind(this);
    this.createComment = this.createComment.bind(this);
    this.createFragment = this.createFragment.bind(this);
    this.createNativeElement = this.createNativeElement.bind(this);
    this.createFromPrototype = this.createFromPrototype.bind(this);
    this.applyProps = this.applyProps.bind(this);
    this.applyClass = this.applyClass.bind(this);
    this.normalizeClass = this.normalizeClass.bind(this);
    this.appendChildren = this.appendChildren.bind(this);
  }

  createElement = (
    type: ElementType,
    props?: ElementProps,
    children?: ElementChildren
  ): Element => {
    // 根据类型分发到不同的创建方法
    if (typeof type === 'string') {
      return this.createNativeElement(type, props, children);
    } else if (this.isPrototype(type)) {
      return this.createFromPrototype(type, props, children);
    }

    throw new Error(`不支持的元素类型: ${String(type)}`);
  };

  abstract createText(content: string): Text;
  abstract createComment(content: string): Comment;
  abstract createFragment(children?: ElementChildren[]): Element;

  protected abstract createNativeElement(
    tag: string,
    props?: ElementProps,
    children?: ElementChildren
  ): Element;

  protected abstract createFromPrototype(
    prototype: Prototype<any>,
    props?: ElementProps,
    children?: ElementChildren
  ): Element;

  protected isPrototype(type: any): type is Prototype<any> {
    return type && typeof type.setup === 'function';
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
        if (child instanceof Node) {
          // 如果是 Node 实例，直接追加
          parent.appendChild(child);
        } else {
          // 其他情况转换为文本节点
          parent.appendChild(this.createText(String(child)));
        }
      }
    });
  }
}
