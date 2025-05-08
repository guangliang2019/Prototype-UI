import { Prototype, PrototypeAPI } from '@/core/interface';
import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUpdated,
} from 'vue';
import { createPropsManager } from './managers/props';
import { createStateManager } from './managers/state';
import { createEventManager } from './managers/event';
import { createContextManager } from './managers/context';
import { createRenderManager } from './managers/render';
import { createVueLifecycleManager } from './managers/lifecycle';
import { createVueRenderer } from './renderer';

const VueAdapter = <Props extends {}, Exposes extends {} = {}>(
  prototype: Prototype<Props, Exposes>
) => {
  return defineComponent({
    setup() {
      const prototypeSetup = prototype.setup;

      const _propsManager = createPropsManager();
      const _stateManager = createStateManager();
      const _eventManager = createEventManager();
      const _contextManager = createContextManager();
      const _renderManager = createRenderManager();

      const _renderer = createVueRenderer();

      // lifecycle
      const _lifecycleManager = createVueLifecycleManager();
      _lifecycleManager.trigger('created');
      onMounted(() => {
        _lifecycleManager.trigger('mounted');
      });
      onUpdated(() => {
        _lifecycleManager.trigger('updated');
      });
      onBeforeUnmount(() => {
        _lifecycleManager.trigger('beforeUnmount');
      });
      onDeactivated(() => {
        console.warn('Vue 没有 beforeDestroy 生命周期');
        _lifecycleManager.trigger('beforeDestroy');
      });

      const _checkMounted = (funcName: string) => {
        if (!_lifecycleManager.hasTriggered('mounted'))
          throw Error(
            `[WebComponentAdapter] ${funcName} can only be called after the component is mounted.`
          );
      };

      const createP = (): PrototypeAPI<Props, Exposes> => {
        return {
          props: {
            define: _propsManager.define,
            set: _propsManager.set,
            get: _propsManager.get,
            watch: _propsManager.watch,
          },
          state: {
            define: _stateManager.define,
          },
          event: {},
          context: {},
          lifecycle: {
            onCreated: (callback) => _lifecycleManager.add('created', callback),
            onMounted: (callback) => _lifecycleManager.add('mounted', callback),
            onUpdated: (callback) => _lifecycleManager.add('updated', callback),
            onBeforeUnmount: (callback) => _lifecycleManager.add('beforeUnmount', callback),
            onBeforeDestroy: (callback) => _lifecycleManager.add('beforeDestroy', callback),
          },
          view: {
            update: async () => _renderManager.requestRender(),
            forceUpdate: async () => _renderManager.forceRender(),
            getElement: () => {
              _checkMounted('getElement');
              return getCurrentInstance()?.proxy?.$el;
            },
            insertElement: () => {
              // TODO: 之后实现
              return -1;
            },
            compareElementPosition: () => {
              // TODO: 之后实现
              return -1;
            },
          },
          role: {
            asTrigger: () => {
              // TODO: 之后实现
            },
          },
          debug: {
            log: console.log,
            warn: console.warn,
            error: console.error,
          },
        };
      };

      const p = createP();

      const prototypeRender = prototypeSetup(p);

      return () => {
        if (!prototypeRender) return null;
        return prototypeRender(_renderer);
      };
    },
  });
};
export default VueAdapter;
