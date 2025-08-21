import { Prototype, PrototypeAPI, State } from '@/core/interface';
import {
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  VNode,
} from 'vue';
import { VueRenderer } from './renderer';
import VueEventManager from './managers/event';
import VuePropsManager from './managers/props';
import VueStateManager from './managers/state';
import { WebAttributeManagerImpl } from '../attribute';
import VueLifecycleManager from './managers/lifecycle';
import { VueRenderManager } from './managers/render';
import { createPrototypeElement } from '../prototype-element';

export const VueAdapter = <Props extends {}, Exposes extends {} = {}>(
  prototype: Prototype<Props, Exposes, VNode>
) => {
  const _setup = prototype.setup;

  const _eventManager = new VueEventManager();
  const _propsManager = new VuePropsManager<Props>();
  const _stateManager = new VueStateManager();
  const _lifecycleManager = new VueLifecycleManager();
  const _renderManager = new VueRenderManager();

  let _getElement: () => HTMLElement = () => {
    throw new Error('[VueAdapter] getElement is not implemented');
  };

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
    // TODO: 少了context，export部分

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
    context: {},
    expose: {},
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
        return _getElement();
      },
      update: async () => {
        return _update();
      },
    },
  } as PrototypeAPI<Props, Exposes>;
  const _render = _setup(_p);

  const _update = () => {
    if (_render) {
      _renderManager.requestRender();
    }
  };
  // 构建一个 vue 的组件
  return defineComponent({
    // props: _propsManager.getVuePropsDefinition(),
    props: _propsManager.getVuePropsDefinition(),
    setup(props, { slots }) {
      const _temp_rootElement = createPrototypeElement();
      const _rootRef = ref<HTMLElement | null>(null);
      const _instance = getCurrentInstance();
      if (!_instance) {
        throw new Error('[VueAdapter] getCurrentInstance is not implemented');
      }

      _getElement = () => {
        if (_rootRef.value) return _rootRef.value;
        return _temp_rootElement.element;
      };

      _renderManager.init(_instance);
      _lifecycleManager.trigger('created');

      onMounted(() => {
        // 处理各个 manager 的初始化
        _propsManager.initRef(_getElement());
        _propsManager.mount();
        _lifecycleManager.trigger('mounting');

        const domElement = getCurrentInstance()?.proxy?.$el;

        const _attributeManager = new WebAttributeManagerImpl(domElement, domElement);

        _eventManager.init(domElement);

        _stateManager.init(domElement, _attributeManager);
        _propsManager.setProps(props);
        _eventManager.mount();

        _handlePendingPropsListeners();
        _update();
        console.log(_render, 't4');
        _lifecycleManager.trigger('mounted');
      });
      onBeforeUnmount(() => {
        _lifecycleManager.trigger('beforeUnmount');
        _eventManager.destroy();
      });

      console.log(slots.default?.(), 't2');
      const _vueRenderer = new VueRenderer(_render, slots);

      return () =>
        h(
          prototype.name,
          { ref: _rootRef, ..._temp_rootElement.toHProps(), ...props },
          // TODO:这里有点奇怪
          // _render?.(VueRenderer) ?? slots.default?.()
          _vueRenderer.createVNode()
        );
    },
  });
};

export default VueAdapter;
