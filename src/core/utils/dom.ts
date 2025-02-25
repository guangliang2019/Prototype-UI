type Props = {
  [key: string]: any;
  children?: (Node | string)[];
};

// custom createElement function
export function h<T extends HTMLElement>(
  tag: string,
  props: Props = {},
  children: (Node | string)[] = []
): T {
  const element = document.createElement(tag) as T;

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key !== 'children') {
        if (key.slice(0, 2) === 'on') {
          // @ts-ignore
          element[key] = value;
        } else {
          element.setAttribute(key, value as string);
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

export function clearContent(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
