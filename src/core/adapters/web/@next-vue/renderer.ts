import { PrototypeSetupResult, RendererAPI } from '@/core/interface';
import { h, RendererElement, RendererNode, VNode, VNodeChild } from 'vue';

/*
 * 将一个 DOM Element 转换为 Vue 的 VNode
 * @param el HTMLElement 或 Element
 */
export function elementToVNode(el: Element): VNode {
  return convertElement(el);
}

function convertElement(el: Element): VNode {
  const tag = el.tagName.toLowerCase();

  // 提取属性
  const props: Record<string, any> = {};
  for (const attr of Array.from(el.attributes)) {
    props[attr.name] = attr.value;
  }

  // 提取子节点
  const children: VNodeChild[] = [];
  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent?.trim();
      if (text) children.push(text);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      children.push(convertElement(child as Element));
    }
  }

  return h(tag, props, children);
}

export class VueRenderer implements RendererAPI<VNode> {
  private _slots: any;
  private _render: void | PrototypeSetupResult<VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>>;
  constructor(render: void | PrototypeSetupResult<VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>>, slots: any) {
    this._render = render;
    this._slots = slots;
  }

  createVNode() {
    console.log('t1',this._slots);
    this._render?.();
    const slotNames = Object.keys(this._slots);
    console.log('t2',slotNames)
    return this._slots
  }
  
  createElement(type: any, props: Record<string, any>, children: any) { 
    switch (typeof type) {
      case 'string':
        console.log('string',children,type,props);
        switch (typeof children) {
          case 'object':
            console.log('children',children,type,props);
            if (children instanceof Element) return h(type, props, elementToVNode(children));

            if (children === null) return h(type, props, [h('slot')]);
            if (Array.isArray(children)) {
              if (children.length === 0) return h(type, props, [h('slot')]);

              return h(
                type,
                props,
                 children.map((child) => {
                  if (child instanceof Element) return elementToVNode(child);
                  if (child === null) return null;
                  
                  return child;
                })
              );
            }
          case 'undefined':
            return h(type, props, [h('slot')]);
          default:
            return h(type, props, children);
            
        }

      case 'symbol':

        throw new Error(`VueRenderer 暂时不支持以 Symbol 作为 tag-name,${String(type)}`);

      case 'object':
        throw new Error('VueRenderer 暂时不支持以 Object 作为 tag-name');

      default:
        throw new Error('VueRenderer 没有命中任何有效的 tag-name');
    }
  }

  createComment(content: string) {
    // TODO: 删掉或略过
    console.log('createComment111',content);
    return h('text', {}, content) as any;
  }

  createFragment(children: any) {
    console.log('createFragment111',children);
    return h(
      'fragment',
      {},
      children?.map((child: any) => {
        if (child instanceof Element) return elementToVNode(child);
        if (child === null) return null;
        if (Array.isArray(child))
          return child.map((c) => {
            if (c instanceof Element) return elementToVNode(c);
          });
      })
    );
  }

  createText(content: string) {
    // TODO: 删掉或略过
    console.log('createText111',content);
    return h('text', {}, content) as any;
  }
};
