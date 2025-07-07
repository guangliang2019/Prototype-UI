import { Prototype, PrototypeAPI, RendererAPI, State } from '@/core/interface';
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, VNode } from 'vue';
import { VueRenderer } from './renderer';
import VueEventManager from './managers/event';
import VuePropsManager from './managers/props';
import VueStateManager from './managers/state';
import { WebAttributeManagerImpl } from '../attribute';
import VueLifecycleManager from './managers/lifecycle';
import { VueRenderManager } from './managers/render';

export const VueAdapter = <Props extends {}, Exposes extends {} = {}, El = VNode>(
  prototype: Prototype<Props, Exposes, El>
) => {
  const _setup = prototype.setup;

  const _eventManager = new VueEventManager();
  const _propsManager = new VuePropsManager<Props>();
  const _stateManager = new VueStateManager();
  const _lifecycleManager = new VueLifecycleManager();
  const _renderManager = new VueRenderManager();

  const _renderer = VueRenderer;

  const _element = ref<HTMLElement | null>(null);

  const _pendingPropsListeners: Array<{
    props: (keyof Props)[];
    callback: (props: Props) => void;
  }> = [];

  const _handlePendingPropsListeners = () => {
    _pendingPropsListeners.forEach(({ props, callback }) => {
      _propsManager.onPropsChange((newProps) => {
        callback(newProps);
      });
    });
  };

  const _p: PrototypeAPI<Props, Exposes> = {
    // TODO: 完善构建 p 的逻辑

    props: {
      define: (props: Props) => {
        _propsManager.defineProps(props);
      },
      set: (props: Partial<Props>) => _propsManager.setProps(props),
      get: () => _propsManager.getProps(),
      watch: (props: (keyof Props)[], callback: (props: Props) => void) => {
        _pendingPropsListeners.push({ props, callback });
      },
    },
    state: {
      define: <T>(
        initial: T,
        attribute?: string,
        options?: {
          serialize?: (value: T) => string;
          deserialize?: (value: string) => T;
        }
      ) => {
        return _stateManager.useState(initial, attribute, options);
      },
      watch: <T>(state: State<T>, callback: (oldValue: T, newValue: T) => void) => {
        const originalSet = state.set;
        state.set = (value: T) => {
          const oldValue = state.value;
          originalSet.call(state, value);
          callback(value, oldValue);
        };
      },
    },
    lifecycle: {
      onCreated: (callback: () => void) => {
        _lifecycleManager.add('created', callback);
      },
      onMounted: (callback: () => void) => {
        _lifecycleManager.add('mounted', callback);
      },
      onUpdated: (callback: () => void) => {
        _lifecycleManager.add('updated', callback);
      },
      onBeforeUnmount: (callback: () => void) => {
        _lifecycleManager.add('beforeUnmount', callback);
      },
      onBeforeDestroy: (callback: () => void) => {
        _lifecycleManager.add('beforeDestroy', callback);
      },
    },
    role: {
      asTrigger: () => {
        _eventManager.markAsTrigger();
      },
    },
    event: {
      on: (eventName, handler, options) => _eventManager.on(eventName, handler, options),
      off: (eventName, handler) => _eventManager.off(eventName, handler),
      emit: (eventName, detail) => _eventManager.emit(eventName, detail),
      once: (eventName, handler) => _eventManager.once(eventName, handler),
      focus: _eventManager.focus,
      setAttribute: (attr, value) => _eventManager.setAttribute(attr, value),
      removeAttribute: (attr) => _eventManager.removeAttribute(attr),
    },
    view: {
      getElement: () => {
        return _element.value;
      },
      update: async () => {
        return _update();
      },
    },
  } as PrototypeAPI<Props, Exposes>;
  const _render = _setup(_p);

  const _update = () => {
    if (_render) {
      const element = _render(_renderer as unknown as RendererAPI<El>);
      if (element) {
        _renderManager.update(element);
      }
    }
  };
  // 构建一个 vue 的组件
  return defineComponent({
    props: {},
    setup() {
      // 处理各个 manager 的初始化
      _lifecycleManager.trigger('created');

      _propsManager.initRef(getCurrentInstance()?.proxy as unknown as HTMLElement);
      if (getCurrentInstance()?.proxy) {
        _element.value = getCurrentInstance()?.proxy as unknown as HTMLElement;
      }
      _propsManager.mount();

      onMounted(() => {
        _lifecycleManager.trigger('mounting');

        const domElement = getCurrentInstance()?.proxy?.$el;
        _element.value = domElement;

        const _attributeManager = new WebAttributeManagerImpl(domElement, domElement);

        _eventManager.init(domElement);

        _stateManager.init(domElement, _attributeManager);
        _renderManager.init(domElement);
        _eventManager.mount();

        _handlePendingPropsListeners();
        _lifecycleManager.trigger('mounted');

        // TODO: 这里的update要怎么去触发
        _update();
      });
      onBeforeUnmount(() => {
        _lifecycleManager.trigger('beforeUnmount');
        _eventManager.destroy();
      });

      return () => _render?.(VueRenderer as RendererAPI<El>);
    },
  });
};

export default VueAdapter;
