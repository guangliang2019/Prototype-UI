import { RenderManager } from '@/core/interface';
import { ComponentInternalInstance } from 'vue';

export class VueRenderManager implements RenderManager {
  private host: ComponentInternalInstance | null = null;

  init(host: ComponentInternalInstance) {
    this.host = host;
  }

  requestRender() {
    this.host?.proxy?.$forceUpdate();
  }

  forceRender() {
    this.host?.proxy?.$forceUpdate();
  }
}
