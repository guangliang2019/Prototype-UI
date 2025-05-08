import { defineComponent, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { Prototype, PrototypeAPI } from '@/core/interface';
import type { ComponentPublicInstance } from 'vue';

/**
 * 
 * Vue 适配器
 * 将组件原型转换为 Vue 
 */
export const VueAdapter = <Props extends {}, Exposes extends {} ={}>(
  prototype: Prototype<Props, Exposes>
): ComponentPublicInstance => {
  const Constructor = defineComponent({
    name: prototype.name,
    setup() {
      let _exposes: Exposes = {} as Exposes;
      const instance = getCurrentInstance();
      
      const createHooks = (): PrototypeAPI<Props, Exposes> => {
        return {
          expose: {
            define: (key, value) => {
              _exposes[key] = value;
            },
            get: (key) => _exposes[key]
          },
          lifecycle: {
            onCreated: () => {},
            onMounted: () => {},
            onUpdated: () => {},
            onBeforeUnmount: () => {},
            onBeforeDestroy: () => {}
          },
          props: {
            define: () => {},
            set: () => {},
            get: () => ({} as Props),
            watch: () => {}
          },
          state: {
            define: <T>(initial: T) => ({ value: initial, set: (v: T) => {} }),
            watch: () => {}
          },
          context: {
            provide: () => {},
            watch: () => {},
            get: () => ({}) as any
          },
          role: {
            asTrigger: () => {}
          },
          event: {
            on: () => {},
            off: () => {},
            emit: () => {},
            click: () => {},
            setAttribute: () => {},
            removeAttribute: () => {},
            once: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => {},
            focus: {
              setPriority: (priority: number) => {},
              getPriority: () => 0,
              set: (focus: boolean) => {}
            }
          },
          view: {
            getElement: () => {
              if (!instance?.proxy?.$el) {
                throw new Error(
                  'element.get can only be called after the component is mounted. ' +
                  'Please use it in mounted or later lifecycle hooks.'
                );
              }
              return instance.proxy.$el as HTMLElement;
            },
            update: async () => {
              if (!instance?.proxy?.$el) {
                throw new Error(
                  'element.get can only be called after the component is mounted. ' +
                  'Please use it in mounted or later lifecycle hooks.'
                );
              }
              return Promise.resolve();
            },
            forceUpdate: async () => {
              if (!instance?.proxy?.$el) {
                throw new Error(
                  'element.get can only be called after the component is mounted. ' +
                  'Please use it in mounted or later lifecycle hooks.'
                );
              }
              return Promise.resolve();
            },
            insertElement: (list: HTMLElement[], element?: HTMLElement, index?: number) => {
              return index ?? list.length;
            },
            compareElementPosition: (target: HTMLElement, element?: HTMLElement) => {
              return 0;
            }
          }
        };
      };

      const hooks = createHooks();
      const setup = prototype.setup(hooks);

      onMounted(() => {
        if (setup) {
          setup();
        }
      });

      onUnmounted(() => {
        // 清理工作
      });

      return {};
    }
  });
  
  return Constructor as unknown as ComponentPublicInstance;
};