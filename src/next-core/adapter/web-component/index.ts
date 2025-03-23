import { Component } from '@/next-core/interface';
import {
  WebAttributeManager,
  WebLifecycleManager,
  WebRenderManager,
  WebStateManager,
  WebPropsManager,
  WebEventManager,
} from './managers';
import type {
  ElementChildren,
  ElementProps,
  ElementType,
  PropType,
  State,
} from '@/next-core/interface';
import { Context, Prototype, PrototypeHooks } from '@/next-core';
import { EventHandler, EventOptions } from '@/next-core/interface';
import { PrototypeSetupResult } from '@/next-core/interface';
import { WebRenderer } from './renderer';
import { WebComponentContextManager } from './managers/context';
import { ElementPosition } from '@/next-core/interface/element';
import { binarySearch } from '@/next-core/utils/search';
import { WebEventCommands } from './commands/event';
import { attachComponent } from '@/next-core/utils/component';

type Constructor<T> = new (...args: any[]) => T;

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

/**
 * Web Components 适配器
 * 将组件原型转换为 Web Component 类
 */
export const WebComponentAdapter = <Props extends Record<string, PropType>>(
  prototype: Prototype<Props>
): Constructor<HTMLElement & Component> => {
  return class extends HTMLElement implements Component {
    private _lifecycle = new WebLifecycleManager();
    private _attributeManager = new WebAttributeManager();
    private _states = new WebStateManager(this, this._attributeManager);
    private _render = new WebRenderManager(this);
    private _propsManager = new WebPropsManager<Props>(this, prototype.options);
    private _eventManager = new WebEventManager(this);
    private _contextManager: WebComponentContextManager = new WebComponentContextManager(this);

    private _eventCommands = new WebEventCommands(this._eventManager);

    private _renderer = new WebRenderer({
      eventManager: this._eventManager,
      attributeManager: this._attributeManager,
      lifecycleManager: this._lifecycle,
      stateManager: this._states,
      propsManager: this._propsManager,
    });

    private _isDestroyed = false;
    private _setupResult: PrototypeSetupResult | void;
    private _pendingContextOperations: PendingContextOperation[] = [];

    // Component 接口实现
    get element(): Element {
      return this;
    }

    get eventManager() {
      return this._eventManager;
    }

    get props() {
      return this._propsManager;
    }

    get state() {
      return this._states;
    }

    get context() {
      return this._contextManager;
    }

    constructor() {
      super();

      attachComponent(this, this);

      // 执行 setup 获取结果
      this._setupResult = prototype.setup(this.createHooks());

      // 触发 created 回调
      this._lifecycle.trigger('created');
    }

    private createHooks(): PrototypeHooks<Props> {
      return {
        useCreated: (cb) => this._lifecycle.add('created', cb),
        useDestroyed: (cb) => this._lifecycle.add('destroyed', cb),
        useMounted: (cb) => this._lifecycle.add('mounted', cb),
        useUnmounted: (cb) => this._lifecycle.add('unmounted', cb),
        useUpdated: (cb) => this._lifecycle.add('updated', cb),

        markAsTrigger: () => {
          this._eventManager.markAsTrigger();
        },

        watchAttribute: (name, callback) => {
          this._attributeManager.watch(name, callback);
        },

        // useEvent: <T>(eventName: string, handler: EventHandler<T>, options?: EventOptions) => {
        //   this._eventManager.on(eventName, handler, options);

        //   // 在组件销毁时自动移除事件监听
        //   this._lifecycle.add('destroyed', () => {
        //     this._eventManager.off(eventName, handler);
        //   });
        // },

        // emitEvent: <T>(eventName: string, detail: T) => {
        //   this._eventManager.emit(eventName, detail);
        // },

        useState: (initial, attribute, options) =>
          this._states.useState(initial, attribute, options),

        onStateChange: <T>(state: State<T>, callback: (newValue: T, oldValue: T) => void) => {
          const originalSet = state.set;
          state.set = (value: T) => {
            const oldValue = state.value;
            originalSet.call(state, value);
            callback(value, oldValue);
          };
        },

        onPropsChange: (
          props: (keyof Props)[],
          callback: (changedProps: Partial<Props>) => void
        ) => {
          return this._propsManager.onPropsChange((newProps: Props) => {
            const changedProps = props.reduce((acc, key) => {
              acc[key] = newProps[key];
              return acc;
            }, {} as Partial<Props>);
            callback(changedProps);
          });
        },

        h: (type: ElementType, props?: ElementProps, children?: ElementChildren[]) => {
          return this._renderer.createElement(type, props, children);
        },

        // Context hooks
        provideContext: <T>(
          context: Context<T>,
          initialValue: T | ((update: (value: Partial<T>, notify?: boolean) => void) => T)
        ): void => {
          this._pendingContextOperations.push({
            type: 'provide',
            context,
            ...(typeof initialValue === 'function'
              ? { initialValueFn: initialValue }
              : { initialValue }),
          } as PendingContextOperation<T>);
        },

        watchContext: <T>(
          context: Context<T>,
          callback?: (value: T, changedKeys: string[]) => void
        ): void => {
          if (callback) {
            this._contextManager.addContextListener(context, callback);
          }
          this._pendingContextOperations.push({
            type: 'watch',
            context,
          });
        },

        getContext: <T>(context: Context): T => {
          const value = this._contextManager.getConsumedValue(context);

          if (value === undefined) {
            throw new Error(
              `No provider found for the context "${context.displayName}". ` +
                'Make sure you have called watchContext before using getContext.'
            );
          }

          return value;
        },

        getProps: () => {
          if (!this._lifecycle.hasTriggered('created')) {
            throw new Error(
              'getProps() can only be called after the component is created. ' +
                'Please use it in created or later lifecycle hooks.'
            );
          }
          if (this._isDestroyed) {
            throw new Error('getProps() cannot be called after the component is destroyed.');
          }
          return this._propsManager.getProps();
        },

        element: {
          get: () => {
            if (!this._lifecycle.hasTriggered('mounted')) {
              throw new Error(
                'element.get can only be called after the component is mounted. ' +
                  'Please use it in mounted or later lifecycle hooks.'
              );
            }
            return this;
          },

          comparePosition: (a, b) => {
            if (!this._lifecycle.hasTriggered('mounted')) {
              throw new Error(
                'element.comparePosition can only be called after the component is mounted. ' +
                  'Please use it in mounted or later lifecycle hooks.'
              );
            }
            if (b === undefined) b = this;
            // 处理非法输入
            if (!a || !b) return ElementPosition.INVALID;

            // 处理同一元素
            if (a === b) return ElementPosition.SAME;

            // 使用原生 API
            return a.compareDocumentPosition(b) as ElementPosition;
          },

          getListIndex: (list, element) => {
            if (!this._lifecycle.hasTriggered('mounted')) {
              throw new Error(
                'element.getListIndex can only be called after the component is mounted. ' +
                  'Please use it in mounted or later lifecycle hooks.'
              );
            }
            if (element === undefined) element = this;
            if (!list.includes(element)) return -1;

            return binarySearch(list, element, (a, b) => {
              const position = a.compareDocumentPosition(b);
              if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                return -1; // a 在 b 前
              } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                return 1; // a 在 b 后
              }
              return 0; // a 和 b 相同
            });
          },
        },

        event: this._eventCommands,
      };
    }

    static get observedAttributes() {
      return prototype.options.observedAttributes || [];
    }

    connectedCallback() {
      if (this._isDestroyed) return;

      // 初始化 props
      this._propsManager.initialize();

      // 处理所有待处理的 Context 操作
      this._pendingContextOperations.forEach((operation) => {
        if (operation.type === 'provide') {
          const value = operation.initialValueFn
            ? operation.initialValueFn((value, notify = true) => {
                const changedKeys = Object.keys(value) ?? [];
                const currentValue = this._contextManager.getProvidedValue(operation.context);

                Object.assign(currentValue, value);
                this._contextManager.setProvidedValue(operation.context, currentValue);
                this._contextManager.getConsumers(operation.context).forEach((consumer) => {
                  consumer.context.setConsumedValue(
                    operation.context,
                    currentValue,
                    changedKeys,
                    notify
                  );
                });
              })
            : operation.initialValue;

          // 提供 Context 并更新所有 Consumer
          this._contextManager.provideContext(operation.context, value);
          // this._contextManager.updateConsumers(operation.context, value);
        } else if (operation.type === 'watch') {
          this._contextManager.consumeContext(operation.context, null);
        }
      });
      this._pendingContextOperations = [];

      // 同步所有待处理的属性
      this._states.flushAttributes();

      // 挂载事件管理器
      this._eventManager.mount();

      this._lifecycle.trigger('mounted');
      this.update();
    }

    disconnectedCallback() {
      if (this._isDestroyed) return;

      // 卸载事件管理器
      this._eventManager.unmount();

      this._lifecycle.trigger('unmounted');
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (this._isDestroyed) return;
      this._attributeManager.handleChange(name, oldValue, newValue);
    }

    private update() {
      if (this._isDestroyed) return;

      // 如果有 render 函数，使用它来更新
      if (this._setupResult?.render) {
        const element = this._setupResult.render(this._renderer);

        this._render.update(element);
      }
    }

    // 提供给外部的渲染控制方法
    requestRender(): void {
      if (!this._isDestroyed) {
        this._render.requestRender();
      }
    }

    forceRender(): void {
      if (!this._isDestroyed) {
        this._render.forceRender();
      }
    }

    destroy() {
      if (this._isDestroyed) return;

      this._isDestroyed = true;
      this._lifecycle.trigger('destroyed');

      // 清理资源
      this._lifecycle.clear();
      this._states.clear();
      this._render.clear();
      this._eventManager.clearAll();
      this._contextManager.destroy();
    }
  };
};
