import { RenderManager } from '@/core/interface';

export class VueRenderManager implements RenderManager {


  // TODO: 这里要考虑是用VNode还是Node
  private content: Node | null = null;
  private pendingContent: Node | null = null;
  private renderRequested = false;
  private host: HTMLElement | null = null;

  init(host: HTMLElement): void {
    this.host = host;
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
    console.log('flush1');
  
    if (this.content) {
      console.log('flush2');
      this.host?.replaceChild(this.pendingContent, this.content);
    } else {
      console.log('flush3',this.pendingContent);
      this.host?.appendChild(this.pendingContent);
    }

    this.content = this.pendingContent;
    this.pendingContent = null;
    this.renderRequested = false;
  }

  clear(): void {
    this.content = null;
    this.pendingContent = null;
    this.renderRequested = false;
    this.host = null;
  }
}