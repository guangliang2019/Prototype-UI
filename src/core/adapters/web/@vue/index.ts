import { Prototype, PrototypeAPI, State ,Context ,UpdateContext, EventManager, PropsManager, PrototypeSetupResult, StateManager, AttributeManager, EventHandler} from '@/core/interface';
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUpdated,
  provide,
  ref,
  watch,
  nextTick,
} from 'vue';
import { createPropsManager } from './managers/props';
import { createStateManager } from './managers/state';
import { createEventManager, EventAction } from './managers/event';
import { createContextManager } from './managers/context';
import { createRenderManager } from './managers/render';
import { createVueLifecycleManager } from './managers/lifecycle';
import { createVueRenderer } from './renderer';
import { createEventComment } from './managers/eventCommands';
import { binarySearch } from '@/core/utils/search';
import { EventCommands } from '@/core/interface/event';
import { VueAttributeManagerImpl } from './managers/attribute';
import { debug } from 'console';

// 这里可能需要优化
type PendingContextOperation<T = any> = {
  type: 'provide' | 'watch';
  context: Context<T>;
} & (
  | {
      type: 'provide';
      initialValue?: T;
      initialValueFn?: (update: (value: Partial<T>, notify?: boolean) => void) => T;
    }
  | {
      type: 'watch';
      callback?: (value: T, changedKeys: string[]) => void;
    }
);

export const VueAdapter = <Props extends {}, Exposes extends {} = {}>(
  prototype: Prototype<Props, Exposes>
) => {

  const prototypeSetup = prototype.setup;
  // todo: 之后需要优化，可能不需要这个propsManager, 或者说是用vue去写
  let _propsManager:PropsManager<Props>;
  let _statesManager:StateManager;
  // todo 这里由于需要使用getCurrentInstance 所以需要放在setup中，可能不需要？

  let _eventManager:EventManager & EventAction;
  let _eventCommands:EventCommands;
  // todo 这里可能不需要 _contextManager 
  const _contextManager = createContextManager();
  const _renderManager = createRenderManager();
  let _pendingProps:Record<string,any> =  {};
  // TODO 稍后去写
  const _renderer = createVueRenderer();
  let _attributeManager:AttributeManager;

  const _pendingEventListeners:Array<{
    event:string;
    callback:EventHandler<any>;
  }> = [];

  let _setupPhase: boolean = true;
  const checkSetupPhase = (name: string) => {
    if (!_setupPhase)
      throw new Error(`${name} can only be called at the root of the prototype.`);
  };

  const _exposes: Exposes = {} as Exposes;

  const _checkMounted = (funcName: string) => {
    if (!_lifecycleManager.hasTriggered('mounted'))
      throw Error(
        `[WebComponentAdapter] ${funcName} can only be called after the component is mounted.`
      );
  };


  let _isDestroyed = false;

  let _pendingPropsListeners: Array<{
    props: (keyof Props)[];
    callback: (props:Props) => void;
  }> = [];

  const _handlePendingProps = ()=> {
    if(_pendingProps){
      _propsManager.defineProps(_pendingProps as Props);
      _pendingProps = {};

    }
  }

  // lifecycle
  const _lifecycleManager = createVueLifecycleManager();
  
  const _handlePendingPropListeners = () => {
    // 处理所有待处理的监听器
    _pendingPropsListeners.forEach(({ callback }) => {
      _propsManager.onPropsChange((newProps) => {
        callback(newProps);
      });
    });
    _pendingPropsListeners = [];
  }

  const createP = (): PrototypeAPI<Props, Exposes> => {
    return {
      props: {
        // 这部分用vue的 defineProps 
        define: (defaultProps: Props) => { 
          checkSetupPhase('props.define');
          Object.assign(_pendingProps,defaultProps)

         },
        set: (props: Partial<Props>) => {
          // TODO 稍后去除 
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
        // todo: 目前这样 可能需要知道知道这个props的内容
        watch: (props: (keyof Props)[], callback: (props:Props)=> void) => { 
          checkSetupPhase('props.watch');
          _pendingPropsListeners.push({props,callback});
        } ,
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
          checkSetupPhase('state.define');
          return _statesManager.useState(initial, attribute, options);
        },
        //可能要考虑用vue的watch
        watch: function <T>(state: State<T>, callback: (oldValue: T, newValue: T) => void): void {
          // 保存原始的 set 方法
          checkSetupPhase('state.watch');
          const originalSet = state.set;
          // 重写 set 方法
          state.set = (value: T) => {
            const oldValue = state.value;
            // 调用原始的 set 方法
            originalSet.call(state, value);
            // 执行回调
            callback(value,oldValue);
          };
        }
      },
      // todo:之后实现
      event: _eventCommands,
      context: {
        provide: <T>(context: Context<T>, valueBuilder: (update: UpdateContext<T>) => T) => {
          // 创建一个响应式的值 这里是看 provide 的情况
          checkSetupPhase('context.provide');
          const value = ref<T>(valueBuilder((newValue, notify = true) => {
            // 直接更新响应式值
            value.value = newValue;
          }));

          // todo： 这里可能不能用provide？需要考虑一下
          provide(context.id, value);
        },
        // todo:  需要声明一个不是响应式  通知到其他  需要提供一个vue的监听
        watch: <T>(context: Context<T>, listener?: (value: T, changedKeys: string[]) => void) => {
          // 这里不需要跟WebComponent 的一样需要重新改变，是因为这里用vue的provide 
          checkSetupPhase('context.watch');
          const value = inject(context.id);
          if(value ){ 
            watch( value, (newValue) => {
              listener?.(newValue as T, []);
            });
          } else {
            throw new Error(
              `No provider found for the context "${context.name}".`
            );
          }
          // TODO:这里需要考虑
          // if(listener){
          //   _contextManager.addContextListener(context, listener);
          // }


        },
        get: <T>(context: Context<T>) => {
          const value = inject(context.id);
          if (value === undefined) {
            throw new Error(
              `No provider found for the context "${context.name}".`
            );
          }
          return value as T;
        }
      },
      lifecycle: {
        onCreated: (callback) => {
          checkSetupPhase('lifecycle.onCreated');
          _lifecycleManager.add('created', callback);
        },
        onMounted: (callback) => {

          
          checkSetupPhase('lifecycle.onMounted');
          _lifecycleManager.add('mounted', callback);
        },
        onUpdated: (callback) => {
          checkSetupPhase('lifecycle.onUpdated');
          _lifecycleManager.add('updated', callback);
        },
        onBeforeUnmount: (callback) => {
          checkSetupPhase('lifecycle.onBeforeUnmount');
          _lifecycleManager.add('beforeUnmount', callback);
        },
        onBeforeDestroy: (callback) => {_lifecycleManager.add('beforeDestroy', callback),
          checkSetupPhase('lifecycle.onBeforeDestroy');
          _lifecycleManager.add('beforeDestroy', callback);
        },
      },
      //  todo 
      view: {
        getElement: () => {
          if(!_lifecycleManager.hasTriggered('mounting')){

            throw new Error(
              'element.get can only be called after the component is mounting. ' +
                'Please use it in mounting or later lifecycle hooks.'
            );
          }
          return getCurrentInstance()?.proxy?.$el;
        },
        update: async () => {
          if(!_lifecycleManager.hasTriggered('updated')){
            throw new Error(
              'element.update can only be called after the component is updated. ' +
                'Please use it in updated or later lifecycle hooks.'
            );
          }
          // todo 这里要考虑一下
          nextTick();
          return ;
        },
        forceUpdate: async () => {
          checkSetupPhase('view.forceUpdate');
        },
        insertElement: (list, element, index) => {
          if(!_lifecycleManager.hasTriggered('mounted')){
            throw new Error(
              'element.insert can only be called after the component is mounted. ' +
                'Please use it in mounted or later lifecycle hooks.'
            );
          }
          const el = element || getCurrentInstance()?.proxy?.$el;

          if (index !== undefined) {
            list.splice(index, 0, el);
            return index;
          }
          let currentIndex = -1;
          nextTick(() => {
            currentIndex = binarySearch(list, el, (a, b) => {
              const position = a.compareDocumentPosition(b);
              if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
              if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
              return 0;
            });

            if (list.includes(el)) {
              list.splice(list.indexOf(el), 1);
            }

            list.splice(currentIndex === -1 ? list.length : currentIndex, 0, el);
          });

          return currentIndex === -1 ? list.length - 1 : currentIndex;
        },
        compareElementPosition: (target, element) => {
          if(!_lifecycleManager.hasTriggered('mounted')){
            throw new Error(
              'element.comparePosition can only be called after the component is mounted. ' +
                'Please use it in mounted or later lifecycle hooks.'
            );
          }
          const el = element || getCurrentInstance()?.proxy?.$el;
          return target.compareDocumentPosition(el);
        }
      },
      role: {
        asTrigger: () => {
          checkSetupPhase('role.asTrigger');
          // TODO: 跳过
        },
      },
      expose: {
        // todo: Vue的exposeAPI, 查看一下能不能暴露到DOM 
        // GPT上只有两种方法，一种是用这个defineProperty ,一个是Vue 3 内置对标准 Web Component 的支持，你可以把组件编译成 Custom Element

        define: (key, value) => {
          _exposes[key] = value;

        }, 
        get: (key) => _exposes[key]
      }
      // debug: {
      //   log: console.log,
      //   warn: console.warn,
      //   error: console.error,
      // },
    };
  };


  // todo：更新函数
  // const _update = () => {
  //   if (this._isDestroyed) return;
  //   if (this._setupResult) {
  //     const element = this._setupResult(this._renderer);
  //     if (element) {
  //       this._renderManager.update(element);
  //     }
  //   }
  // }

  return defineComponent({

    // constructor -> created(即实在setup之前)
    // conntectedCallback -> mounting



    // 在这里面应该是执行上面记录用户想在生命周期干什么，并“回放” 。
    props: {
      // TODO 这里可能会有点问题 
      _handlePendingProps,
    },
    setup(props) {

      const currentInstance = getCurrentInstance();
      if (!currentInstance) {
        throw new Error('getCurrentInstance() returned null');
      }


      const p = createP();

      let prototypeRender = prototypeSetup(p) ?? (() => {});

     
      
      //TODO 这里需要考虑一下，这里instance需要在挂载后才能获取到，放到onMounted的话，这个eventManager 就会无法获得对应的方法

      // 问一下，可能这里需要 重构一下

      expose: {
        // 应该在这里暴露 但如果是在这里暴露的话 expose.get 可能会获取不到对应的方法，

      }

      // expose  这里要问一下，在webComponent 这里要触发一下 this._lifecycle.trigger('created');

      // todo 这里就有问题了， 这个getCurrentInstance 是在setup 中获取的， 所以这个el 是获取不到的
      Object.entries(_exposes).forEach(([key, value]) => {
        const el = getCurrentInstance()?.proxy?.$el;
        if (key in el) {
          console.warn(
            `[VueAdapter] Property "${key}" already exists on the "${prototype.name}", ` +
              'exposing it will override the original property.'
          );
        }
    
          Object.defineProperty(el, key, {
            value,
            configurable: true,
            enumerable: true,
          });
      }); 

      _setupPhase = false;
      _lifecycleManager.trigger('created');

      // let prototypeRender: PrototypeSetupResult | void;

      _propsManager = createPropsManager<Props>(currentInstance);
 

      onMounted(() => {

        console.log('onMounted')
      // 推迟执行

        // 这里必须要在挂载之后才能执行
        // 这个instance不是指当前的instance ，
        // todo:且应该吧所有要记录的内容部分放到这里面去。
        // TODO: 这里的记录用户操作的setup，从哪里记录，以及记录什么，以及在哪里执行记录过程
        if (_isDestroyed) return;
   

        const instance = getCurrentInstance()?.proxy?.$el;
        _eventManager = createEventManager(instance);
        // on方法在这里
        // 需要在这使用_pendingEventListeners 去收集用户操作
        _eventCommands = createEventComment(_eventManager);
  
  
        _attributeManager =  VueAttributeManagerImpl(instance, instance);
        _statesManager = createStateManager(instance, _attributeManager);

 

        _lifecycleManager.trigger('mounting');




 

         // todo　这里的我问题是　mounting　状态是早与 mounted 的也就是说要把这部分放到外面？
        // 触发 mounting 状态

        // 初始化 props
        // _propsManager.initialize();
        // 处理待处理的 props
        _handlePendingProps();

   // 处理待处理的 props 监听器
        _handlePendingPropListeners();

        // 这里我不清楚他的生产的先后顺序， 究竟是这个组件先渲染，之后vue在渲染，还是说在vue渲染的过程中组件也渲染了
        // 如果是组件先的话，那这个on方法是根据对应的节点去进行监听的，这样的话，无法获得这个节点了



        // TODO： 这里要考虑的是，这个_pendingContextOperations是对去暂存执行操作的，当对于vue来的可以通过watch去执行，但我感觉如果用vue的watch的话可能无法执行。
          // 处理所有待处理的 Context 操作
  

         
      // 同步所有待处理的属性
        // _statesManager.flushAttributes();

        // 挂载事件管理器
        _eventManager.mount();

        _lifecycleManager.trigger('mounted');
        // _update();

        // 用户的操作

      });
      onUpdated(() => {
        _lifecycleManager.trigger('updated');
      });
      onBeforeUnmount(() => {
        _lifecycleManager.trigger('beforeUnmount');
        // todo 这里的问题就是在卸载前使用
        if (_isDestroyed) return;
        _eventManager.unmount();

      });
      onDeactivated(() => {
        console.warn('Vue 没有 beforeDestroy 生命周期');
        _lifecycleManager.trigger('beforeDestroy');
      });





   


      // 返回一个渲染函数  

      // TODO: 监听并阻断props的变化， 在符合条件时执行回调
      // 无法阻断props的变化， 你只能改变内部是用props的值
      // 这里的符合条件是指什么，以及回调函数从哪里来
      watch(props, (newProps) => {
        // 这里需要判断是否符合条件
        // 如果符合条件，则执行回调
        // 如果不符合条件，则不执行回调
        // 这里需要判断是否符合条件
        
      })


      //todo  这里可能会有问题，可能会因为执行顺序的问题，导致prototypeRender 没有被赋值
      // 且这个_renderer 并没有写全
      return () => {
        if (!prototypeRender) {
          console.log('prototypeRender is not defined');
          return null;
        }
        return prototypeRender(_renderer);
      };
    },
  });
};
export default VueAdapter;
