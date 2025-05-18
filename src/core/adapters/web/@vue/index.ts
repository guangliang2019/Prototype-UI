import { Prototype, PrototypeAPI, State ,Context ,UpdateContext} from '@/core/interface';
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUpdated,
  provide,
  watch,
} from 'vue';
import { createPropsManager } from './managers/props';
import { createStateManager } from './managers/state';
import { createEventManager } from './managers/event';
import { createContextManager } from './managers/context';
import { createRenderManager } from './managers/render';
import { createVueLifecycleManager } from './managers/lifecycle';
import { createVueRenderer } from './renderer';
import { createEventComment } from './managers/eventCommands';


const VueAdapter = <Props extends {}, Exposes extends {} = {}>(
  prototype: Prototype<Props, Exposes>
) => {
  return defineComponent({
    setup() {
      const prototypeSetup = prototype.setup;
      // TODO: 之后需要优化，可能不需要这个propsManager
      let _propsManager=  createPropsManager<Props>();
      const _stateManager = createStateManager();
      const _eventManager = createEventManager();
      const _contextManager = createContextManager();
      const _renderManager = createRenderManager();
      let _pendingProps:Record<string,any> =  {};
      const _renderer = createVueRenderer();

      const _eventCommands= createEventComment(_eventManager)

      let _isDestroyed = false;

      const _pendingPropsListeners: Array<{
        props: (keyof Props)[];
        callback: (props:Props) => void;
      }> = [];



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
            // 这部分用vue的defineProps 
            define: (defaultProps: Props) => { 
              Object.assign(_pendingProps,defaultProps)

             },
            set: (props: Partial<Props>) => { 
              _propsManager.setProps(props);
            },
            get: () => {
              if (!_lifecycleManager.hasTriggered('created')) {
                throw new Error(
                'props.get can only be called after the component is created. ' +
                  'Please use it in created or later lifecycle hooks.'
                )
              };
              if (_isDestroyed) {
               throw new Error('getProps() cannot be called after the component is destroyed.');               
              }
              if (!_propsManager) {
                throw new Error('props.get cannot be called before the component is mounted.');
              }
              return _propsManager.getProps();
            },
            // 放进一个队列中，之后在 某处 中循环触发
            watch: (props: (keyof Props)[], callback: (props:Props)=> void) => { 
              _pendingPropsListeners.push({props,callback});
            } ,
          },
          // 这个好像应该使用 ref 去写
          state: {
            define: _stateManager.useState,
            watch: function <T>(state: State<T>, callback: (oldValue: T, newValue: T) => void): void {
              throw new Error('Function not implemented.');
            }
          },
          // TODO:之后实现
          event: _eventCommands,
          context: {
            provide: <T>(context: Context<T>, valueBuilder: (update: UpdateContext<T>) => T) => {
              // TODO: 这里的provide的key需要在考虑一下
              const value = valueBuilder((newValue, notify = true) => {
                provide(context.name, newValue);
              });

              provide(context.name, value);
            },
            // 不需要监听，因为vue的provide是响应式的
            watch: () => {
              
            },
            
            get: <T>(context: Context<T>) => {
              const value = inject(context.name);
              if (value === undefined) {
                throw new Error(
                  `No provider found for the context "${context.name}".`
                );
              }
              return value as T;
            }
          },
          lifecycle: {
            onCreated: (callback) => _lifecycleManager.add('created', callback),
            onMounted: (callback) => _lifecycleManager.add('mounted', callback),
            onUpdated: (callback) => _lifecycleManager.add('updated', callback),
            onBeforeUnmount: (callback) => _lifecycleManager.add('beforeUnmount', callback),
            onBeforeDestroy: (callback) => _lifecycleManager.add('beforeDestroy', callback),
          },
            // 在 vue中由于是用MVVM的，所以不需要手动更新，更不需要强制更新
          view: {
            update: async () => {
              return;
            },
            forceUpdate: async () => _renderManager.forceRender(),
            getElement: () => {
              _checkMounted('getElement');
              return getCurrentInstance()?.proxy?.$el;
            },
            insertElement: () => {
             
              return -1;
            },
            compareElementPosition: () => {
          
              return -1;
            },
          },
          role: {
            asTrigger: () => {
              // TODO: 之后实现
            },
          },
          expose: {
            // TODO: 之后实现
            define: function <K extends keyof Exposes>(name: K, value: Exposes[K]): void {
              throw new Error('Function not implemented.');
            },
            // TODO: 之后实现
            get: function <K extends keyof Exposes>(name: K): Exposes[K] {
              throw new Error('Function not implemented.');
            }
          }
          // debug: {
          //   log: console.log,
          //   warn: console.warn,
          //   error: console.error,
          // },
        };
      };

      const p = createP();

      const prototypeRender = prototypeSetup(p);

      const _handlePendingProps = () => {
        if (_pendingProps) {
          _propsManager.defineProps(_pendingProps as Props);
          _pendingProps = {};
        }
      };
      
      return () => {
        if (!prototypeRender) return null;
        return prototypeRender(_renderer);
      };
    },
  });
};
export default VueAdapter;
