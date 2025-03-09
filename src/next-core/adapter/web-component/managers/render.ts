import { RenderManager } from '../../interface';

/**
 * Web Components 渲染管理器
 */
export class WebRenderManager implements RenderManager {
  constructor(private host: HTMLElement) {}

  private content: Node | null = null;
  private pendingContent: Node | null = null;
  private renderRequested = false;

  createElement(type: string, props: any, ...children: any[]): Node {
    if (typeof type !== 'string') {
      throw new Error('Web Components adapter only supports string tags');
    }

    const element = document.createElement(type);

    // 设置属性
    Object.entries(props || {}).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.slice(2).toLowerCase(), value as any);
      } else {
        element.setAttribute(key, String(value));
      }
    });

    // 添加子节点
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });

    return element;
  }

  requestRender(): void {
    if (!this.renderRequested) {
      this.renderRequested = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  forceRender(): void {
    this.renderRequested = false;
    this.flush();
  }

  update(content: Node): void {
    this.pendingContent = content;
    this.requestRender();
  }

  private flush(): void {
    if (!this.pendingContent) return;

    if (this.content) {
      this.host.replaceChild(this.pendingContent, this.content);
    } else {
      this.host.appendChild(this.pendingContent);
    }

    this.content = this.pendingContent;
    this.pendingContent = null;
    this.renderRequested = false;
  }

  clear(): void {
    if (this.content) {
      this.host.removeChild(this.content);
      this.content = null;
    }
    this.pendingContent = null;
    this.renderRequested = false;
  }
}
