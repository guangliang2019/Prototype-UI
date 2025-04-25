import { binarySearch } from './search';

type Props = {
  [key: string]: any;
  children?: (Node | string)[];
};

/**
 * 使用深度优先搜索 (DFS) 在 DOM 中查找满足条件的第一个元素。
 * @param rootElement 起始元素
 * @param predicate 判断条件的函数，返回 true 表示找到了匹配的元素
 * @returns {Element | null} 返回找到的元素或 null
 */
export function dfsFindElement(
  rootElement: Element,
  predicate: (element: Element) => boolean
): Element | null {
  // 首先检查根元素是否满足条件
  if (predicate(rootElement)) {
    return rootElement;
  }

  // 遍历子元素
  const children = rootElement.children;
  for (let i = 0; i < children.length; i++) {
    const result = dfsFindElement(children[i], predicate);
    if (result !== null) {
      return result;
    }
  }

  // 如果没有找到，返回 null
  return null;
}

// 自定义 createElement 函数
export function h<T extends HTMLElement | SVGElement>(
  tag: string,
  props: Props = {},
  children: (Node | string)[] = []
): T {
  // 检查是否是 SVG 相关标签
  const isSVG = ['svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'text', 'g'].includes(tag);
  const element = isSVG 
    ? document.createElementNS('http://www.w3.org/2000/svg', tag) as T
    : document.createElement(tag) as T;

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key !== 'children') {
        if (key.slice(0, 2) === 'on') {
          // @ts-ignore
          element[key] = value;
        } else {
          if (isSVG) {
            // 对于 SVG 元素，使用 setAttributeNS
            if (key === 'xlink:href') {
              element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value as string);
            } else {
              element.setAttributeNS(null, key, value as string);
            }
          } else {
            element.setAttribute(key, value as string);
          }
        }
      }
    });
  }

  const fragment = document.createDocumentFragment();

  children.forEach((child) => {
    if (typeof child === 'string') {
      fragment.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      fragment.appendChild(child);
    }
  });

  element.appendChild(fragment);

  return element;
}

export function Div(props: Props = {}, children: (Node | string)[] = []) {
  return h('div', props, children) as HTMLDivElement;
}

export function Span(props: Props = {}, children: (Node | string)[] = []) {
  return h('span', props, children) as HTMLSpanElement;
}

export function P(props: Props = {}, children: (Node | string)[] = []) {
  return h('p', props, children) as HTMLParagraphElement;
}

export function Main(props: Props = {}, children: (Node | string)[] = []) {
  return h('main', props, children) as HTMLElement;
}

export function Aside(props: Props = {}, children: (Node | string)[] = []) {
  return h('aside', props, children) as HTMLElement;
}

export function Nav(props: Props = {}, children: (Node | string)[] = []) {
  return h('nav', props, children) as HTMLElement;
}

export function Ul(props: Props = {}, children: (Node | string)[] = []) {
  return h('ul', props, children) as HTMLUListElement;
}

export function Li(props: Props = {}, children: (Node | string)[] = []) {
  return h('li', props, children) as HTMLLIElement;
}

export function A(props: Props = {}, children: (Node | string)[] = []) {
  return h('a', props, children) as HTMLAnchorElement;
}

// library list
export function PrototypeTabs(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tabs', props, children) as HTMLElement;
}

export function PrototypeTabsContent(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tabs-content', props, children) as HTMLElement;
}

export function PrototypeTabsTrigger(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tabs-trigger', props, children) as HTMLElement;
}

export function PrototypeTabsIndicator(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tabs-indicator', props, children) as HTMLElement;
}

/**
 * 比较两个 DOM 节点的位置。
 * @param a - 第一个 DOM 节点
 * @param b - 第二个 DOM 节点
 * @returns 负数表示 a 在 b 前，0 表示相同，正数表示 a 在 b 后
 */
export function compareDOM(a: Node, b: Node): number {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1; // a 在 b 前
  } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1; // a 在 b 后
  }
  return 0; // a 和 b 相同
}

/**
 * 将 DOM 元素插入到已排序的 DOM 数组中的正确位置。
 * @param domArray - 已排序的 DOM 数组
 * @param domElement - 要插入的 DOM 元素
 */
export function insertDOMInSortedArray(domArray: Node[], domElement: Node): void {
  const index = binarySearch(domArray, domElement, compareDOM);
  domArray.splice(index, 0, domElement);
}

/**
 * 从已排序的 DOM 数组中删除指定的 DOM 元素。
 * @param domArray - 已排序的 DOM 数组
 * @param domElement - 要删除的 DOM 元素
 * @returns 如果找到并删除了元素，则返回 true；如果未找到元素，则返回 false。
 */
export function removeDOMFromSortedArray(domArray: Node[], domElement: Node): boolean {
  const index = binarySearch(domArray, domElement, compareDOM);
  if (index < domArray.length && domArray[index] === domElement) {
    domArray.splice(index, 1);
    return true;
  }
  return false;
}
