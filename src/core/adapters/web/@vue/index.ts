import { Prototype, PrototypeAPI } from '@/core/interface';
import { defineComponent } from 'vue';
import { createPropsManager } from './managers/props';
import { createStateManager } from './managers/state';
import { createEventManager } from './managers/event';
import { createContextManager } from './managers/context';
import { createRenderManager } from './managers/render';
import { createLifecycleManager } from './managers/lifecycle';

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
      const _lifecycleManager = createLifecycleManager();

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
          render: {},
          lifecycle: {},
          view: {},
          role: {},
          debug: {
            log: console.log,
            warn: console.warn,
            error: console.error,
          },
        };
      };

      const p = createP();

      const prototypeRender = prototypeSetup(p);

      return prototypeRender;
    },
  });
};
export default VueAdapter;
