import { RenderManager } from '@/core/interface';

/**
 * Web Components 渲染管理器
 */
export class WebRenderManager implements RenderManager {
  constructor(private host: HTMLElement) {}

  private content: Node | null = null;
  private pendingContent: Node | null = null;
  private renderRequested = false;

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
