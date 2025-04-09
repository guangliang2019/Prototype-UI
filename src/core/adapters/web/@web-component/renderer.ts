import {
  Component,
  ElementChildren,
  ElementProps,
  Prototype,
  EventHandler,
} from '@/core/interface';

import { BaseRenderer } from '../renderer';
import { WebComponentAdapter } from '.';

// SVG 相关的常量
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';

// SVG 属性映射表
const SVG_ATTRIBUTE_MAP: Record<string, string> = {
  // 基本属性
  viewBox: 'viewBox',
  preserveAspectRatio: 'preserveAspectRatio',

  // 描边相关
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',

  // 填充相关
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  clipRule: 'clip-rule',

  // 其他属性
  vectorEffect: 'vector-effect',
  transform: 'transform',
  opacity: 'opacity',
  width: 'width',
  height: 'height',
  x: 'x',
  y: 'y',
  cx: 'cx',
  cy: 'cy',
  r: 'r',
  rx: 'rx',
  ry: 'ry',
  d: 'd',
  points: 'points',
  pathLength: 'pathLength',
  markerStart: 'marker-start',
  markerMid: 'marker-mid',
  markerEnd: 'marker-end',
};

// SVG 工具函数
const SVGUtils = {
  isSvgTag(tag: string): boolean {
    return tag.toLowerCase() === 'svg' || tag.toLowerCase().startsWith('svg:');
  },

  getSvgTagName(tag: string): string {
    return tag.replace('svg:', '').toLowerCase();
  },

  getSvgAttributeName(key: string): string {
    return SVG_ATTRIBUTE_MAP[key] || key;
  },

  createSvgElement(tag: string): SVGElement {
    return document.createElementNS(SVG_NAMESPACE, this.getSvgTagName(tag));
  },

  copyAttributes(source: Element, target: Element): void {
    Array.from(source.attributes).forEach((attr) => {
      if (attr.namespaceURI === XLINK_NAMESPACE) {
        target.setAttributeNS(XLINK_NAMESPACE, attr.name, attr.value);
      } else {
        target.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
      }
    });
  },
};

/**
 * Web 平台的渲染器实现
 */
export class WebRenderer extends BaseRenderer {
  createText(content: string): Text {
    return document.createTextNode(content);
  }

  createComment(content: string): Comment {
    return document.createComment(content);
  }

  protected createNativeElement(
    tag: string,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element {
    const isSvg = SVGUtils.isSvgTag(tag);
    const element = isSvg ? SVGUtils.createSvgElement(tag) : document.createElement(tag);

    if (props && this.context) {
      this.applyProps(element, props, isSvg);
    }

    if (children) {
      this.appendChildren(element, children, isSvg);
    }
    return element;
  }

  protected appendChildren(
    parent: Element,
    children: ElementChildren[] | undefined,
    isSvg: boolean = false
  ): void {
    if (!children) return;

    children.flat().forEach((child) => {
      if (child != null) {
        if (child instanceof Node) {
          if (isSvg && child instanceof Element) {
            const svgChild = SVGUtils.createSvgElement(child.tagName);
            SVGUtils.copyAttributes(child, svgChild);
            parent.appendChild(svgChild);
          } else {
            parent.appendChild(child);
          }
        } else {
          parent.appendChild(this.createText(String(child)));
        }
      }
    });
  }

  protected applyProps(element: Element, props: ElementProps, isSvg: boolean = false): void {
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
          (element as HTMLElement).style[prop as any] = String(val);
        });
      } else if (key === 'class') {
        this.applyClass(element, value);
      } else {
        if (value != null) {
          if (isSvg) {
            if (key.includes(':')) {
              const [namespace, localName] = key.split(':');
              element.setAttributeNS(
                namespace === 'xlink' ? XLINK_NAMESPACE : null,
                localName,
                String(value)
              );
            } else {
              const svgKey = SVGUtils.getSvgAttributeName(key);
              element.setAttributeNS(null, svgKey, String(value));
            }
          } else {
            element.setAttribute(key, String(value));
          }
        } else {
          element.removeAttribute(key);
        }
      }
    });
  }

  createFragment(children?: ElementChildren[]): Element {
    // 创建一个 div 作为 Fragment 的容器
    // 这样可以满足返回类型要求，同时保持 Fragment 的语义
    const fragment = document.createDocumentFragment();

    // 添加子元素
    this.appendChildren(fragment as unknown as Element, children);

    return fragment as unknown as Element;
  }

  protected createFromPrototype(
    prototype: Prototype<any>,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element {
    const ComponentClass = WebComponentAdapter(prototype);
    const instance = new ComponentClass();

    if (props && this.context) {
      // 通过 PropsManager 设置属性
      Object.entries(props).forEach(([key, value]) => {
        if (key !== 'on' && key !== 'hook') {
          this.context.propsManager.setProps({ [key]: value });
        }
      });

      // 应用其他属性
      this.applyProps(instance, props);
    }

    this.appendChildren(instance, children);
    return instance;
  }

  protected createFromComponent(
    component: Component,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element {
    // 对于 Web Components，我们直接使用组件的 element
    const element = component.element;

    if (props && this.context) {
      this.applyProps(element, props);
    }

    this.appendChildren(element, children);
    return element;
  }

  protected applyClass(element: Element, value: ElementProps['class']): void {
    let className: string;
    if (typeof value === 'string') {
      className = value;
    } else if (Array.isArray(value)) {
      className = value
        .map((item) => this.normalizeClass(item))
        .filter(Boolean)
        .join(' ');
    } else if (typeof value === 'object') {
      className = Object.entries(value)
        .filter(([_, active]) => active)
        .map(([name]) => name)
        .join(' ');
    } else {
      return;
    }

    if (element instanceof SVGElement) {
      element.setAttribute('class', className);
    } else {
      element.className = className;
    }
  }
}
