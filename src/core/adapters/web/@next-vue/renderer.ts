import { RendererAPI } from '@/core/interface';
import { h, VNode, VNodeChild } from 'vue';

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

export const VueRenderer: RendererAPI<VNode> = {
  createElement(type, props, children) {
    switch (typeof type) {
      case 'string':
        switch (typeof children) {
          case 'object':
            if (children instanceof Element) return h(type, props, elementToVNode(children));

            if (children === null) return h(type, props);
            if (Array.isArray(children)) {
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

          default:
            h(type, props, children);
        }

      case 'symbol':
        throw new Error('VueRenderer 暂时不支持以 Symbol 作为 tag-name');

      case 'object':
        throw new Error('VueRenderer 暂时不支持以 Object 作为 tag-name');

      default:
        throw new Error('VueRenderer 没有命中任何有效的 tag-name');
    }
  },

  createComment(content) {
    // TODO: 删掉或略过
    return h('text', {}, content) as any;
  },

  createFragment(children) {
    return h(
      'fragment',
      {},
      children?.map((child) => {
        if (child instanceof Element) return elementToVNode(child);
        if (child === null) return null;
        if (Array.isArray(child))
          return child.map((c) => {
            if (c instanceof Element) return elementToVNode(c);
          });
      })
    );
  },

  createText(content) {
    // TODO: 删掉或略过
    return h('text', {}, content) as any;
  },
};
