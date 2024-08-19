type Props = {
  [key: string]: any;
  children?: (Node | string)[];
};

// 自定义 createElement 函数
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
export function PrototypeTab(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tab', props, children) as HTMLElement;
}

export function PrototypeTabContent(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tab-content', props, children) as HTMLElement;
}

export function PrototypeTabTrigger(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tab-trigger', props, children) as HTMLElement;
}

export function PrototypeTabIndicator(props: Props = {}, children: (Node | string)[] = []) {
  return h('prototype-tab-indicator', props, children) as HTMLElement;
}
