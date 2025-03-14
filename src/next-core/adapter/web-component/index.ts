import { Component } from '../interface';
import {
  WebAttributeManager,
  WebLifecycleManager,
  WebRenderManager,
  WebStateManager,
  WebPropsManager,
  WebEventManager,
} from './managers';
import { ContextManager } from '../context';
import type { Context } from '../context';
import type { PropType, State } from '../interface';
import { Prototype, PrototypeHooks } from '@/next-core';
import { EventHandler, EventOptions } from '@/next-core/interface';
import { PrototypeSetupResult, RendererAPI } from '../../interface';

type Constructor<T> = new (...args: any[]) => T;

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
    private _isDestroyed = false;
    private _pendingContextRequests = new Set<symbol>();
    private _setupResult: PrototypeSetupResult | void;

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

    contextChanged?: (key: symbol, value: any, changedKeys: string[]) => void;

    constructor() {
      super();

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

        useEvent: <T>(eventName: string, handler: EventHandler<T>, options?: EventOptions) => {
          this._eventManager.on(eventName, handler, options);

          // 在组件销毁时自动移除事件监听
          this._lifecycle.add('destroyed', () => {
            this._eventManager.off(eventName, handler);
          });
        },

        emitEvent: <T>(eventName: string, detail: T) => {
          this._eventManager.emit(eventName, detail);
        },

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

        h: (type: string, props: any, ...children: any[]) => {
          return this._render.createElement(type, props, ...children);
        },

        // Context hooks
        provideContext: <T>(
          context: Context<T>,
          initialValue: T | ((update: (value: Partial<T>, notify?: boolean) => void) => T)
        ): void => {
          const contextManager = ContextManager.getInstance();
          const value =
            typeof initialValue === 'function'
              ? (initialValue as Function)((value: Partial<T>, notify = true) => {
                  contextManager.setValue(this, context, value, notify);
                })
              : initialValue;

          contextManager.registerProvider(this, context, value);

          // 在组件销毁时注销 provider
          this._lifecycle.add('destroyed', () => {
            contextManager.unregisterProvider(this, context.key);
          });
        },

        watchContext: <T>(
          context: Context<T>,
          callback?: (value: T, changedKeys: string[]) => void
        ): T => {
          const contextManager = ContextManager.getInstance();

          // 将 context 请求添加到待处理队列
          this._pendingContextRequests.add(context.key);

          // 设置回调
          if (callback) {
            this.contextChanged = (key: symbol, value: T, changedKeys: string[]) => {
              if (key === context.key) {
                callback(value, changedKeys);
              }
            };
          }

          // 在组件销毁时注销 consumer
          this._lifecycle.add('destroyed', () => {
            contextManager.unregisterConsumer(this, context.key);
          });

          // 获取当前值
          const provider = contextManager.getProvider(this, context.key);
          if (provider) {
            const value = contextManager.getValue(provider, context);

            // 如果允许 consumer 修改 context，则返回原始引用
            // 否则返回一个只读代理
            return context.options.allowConsumerModify
              ? value
              : (new Proxy(value as object, {
                  set() {
                    console.warn(
                      'Context value is read-only. ' +
                        'If you need to modify it, please set allowConsumerModify to true ' +
                        'when defining the context.'
                    );
                    return false;
                  },
                }) as T);
          }

          return context.defaultValue;
        },

        getContext: <T>(context: Context<T>): T => {
          const contextManager = ContextManager.getInstance();
          const provider = contextManager.getProvider(this, context.key);

          if (!provider) {
            console.warn(
              'No provider found for the context. ' +
                'Make sure you have called watchContext before using getContext.'
            );
            return context.defaultValue;
          }

          return contextManager.getValue(provider, context);
        },

        getInstance: () => {
          if (!this._lifecycle.hasTriggered('mounted')) {
            throw new Error(
              'getInstance() can only be called after the component is mounted. ' +
                'Please use it in mounted or later lifecycle hooks.'
            );
          }
          return this;
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
      };
    }

    static get observedAttributes() {
      return prototype.options.observedAttributes || [];
    }

    connectedCallback() {
      if (this._isDestroyed) return;

      // 初始化 props
      this._propsManager.initialize();

      // 发送所有待处理的 context 请求
      if (this._pendingContextRequests.size > 0) {
        const contextManager = ContextManager.getInstance();
        this._pendingContextRequests.forEach((key) => {
          contextManager.dispatchContextRequest(this, key);
        });
        this._pendingContextRequests.clear();
      }

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
        const element = this._setupResult.render({
          createElement: (
            tag: string | Function,
            props?: Record<string, unknown>,
            children?: (Node | string | number | boolean | null | undefined)[]
          ) => {
            // 实现 createElement
            const el = typeof tag === 'string' ? document.createElement(tag) : new (tag as any)();

            if (props) {
              Object.entries(props).forEach(([key, value]) => {
                if (key.startsWith('on') && typeof value === 'function') {
                  el.addEventListener(key.slice(2).toLowerCase(), value);
                } else {
                  el.setAttribute(key, String(value));
                }
              });
            }

            if (children) {
              children.flat().forEach((child) => {
                if (child instanceof Node) {
                  el.appendChild(child);
                } else if (child != null) {
                  el.appendChild(document.createTextNode(String(child)));
                }
              });
            }

            return el;
          },
          createText: (content: string) => document.createTextNode(content),
          createComment: (content: string) => document.createComment(content),
        } as RendererAPI);

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
    }
  };
};
