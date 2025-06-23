import { Prototype, PrototypeAPI, RendererAPI } from '@/core/interface';
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, VNode } from 'vue';
import { VueRenderer } from './renderer';
import VueEventManager from './managers/event';

export const VueAdapter = <Props extends {}, Exposes extends {} = {}, El = VNode>(
  prototype: Prototype<Props, Exposes, El>
) => {
  const _setup = prototype.setup;
  const _eventManager = new VueEventManager();

  const _p: PrototypeAPI<Props, Exposes> = {
    // TODO: 完善构建 p 的逻辑

    event: {
      on: (eventName, handler, options) => _eventManager.on(eventName, handler, options),
      off: (eventName, handler) => _eventManager.off(eventName, handler),
      emit: (eventName, detail) => _eventManager.emit(eventName, detail),
      once: (eventName, handler) => _eventManager.once(eventName, handler),
    },
  } as PrototypeAPI<Props, Exposes>;
  const _render = _setup(_p);

  // 构建一个 vue 的组件
  return defineComponent({
    props: {},
    setup() {
      // 处理各个 manager 的初始化
      onMounted(() => {
        _eventManager.init(getCurrentInstance()?.proxy?.$el);
        _eventManager.mount();
      });
      onBeforeUnmount(() => {
        _eventManager.destroy();
      });
      return () => _render?.(VueRenderer as RendererAPI<El>);
    },
  });
};

export default VueAdapter;
