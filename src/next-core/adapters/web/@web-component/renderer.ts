import {
  Component,
  ElementChildren,
  ElementProps,
  Prototype,
  VirtualElement,
} from '@/next-core/interface';

import { BaseRenderer } from '../renderer';
import { WebComponentAdapter } from '.';

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
    const element = document.createElement(tag);

    if (props && this.context) {
      this.applyProps(element, props);
    }

    this.appendChildren(element, children);
    return element;
  }

  protected createFragment(
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement {
    // 创建一个 div 作为 Fragment 的容器
    // 这样可以满足返回类型要求，同时保持 Fragment 的语义
    const container = document.createElement('div');
    container.setAttribute('data-fragment', '');

    // 应用属性
    if (props && this.context) {
      this.applyProps(container, props);
    }

    // 添加子元素
    this.appendChildren(container, children);

    return container;
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
}
