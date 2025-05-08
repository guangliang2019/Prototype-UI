import { RenderManager } from '@/core/interface';
import { nextTick } from 'vue';

export const createRenderManager = (): RenderManager => {
  let renderRequested = false;

  return {
    requestRender: () => {
      if (!renderRequested) {
        renderRequested = true;
        nextTick(() => {
          renderRequested = false;
        });
      }
    },
    forceRender: () => {
      renderRequested = false;
      nextTick(() => {
        // 强制立即渲染
      });
    },
  };
};
