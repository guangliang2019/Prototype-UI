import { Component, CONTEXT_MANAGER_SYMBOL, EVENT_MANAGER_SYMBOL } from '@/next-core/interface';
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

// 定义 Web Component 的生命周期接口
export interface WebComponentLifecycle {
  connectedCallback(): void;
  disconnectedCallback(): void;
  adoptedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}

// 定义 Web Component 的静态属性接口
export interface WebComponentStatic {
  readonly observedAttributes: string[];
}

// 组合所有需要的接口
type WebComponentInstance<T extends HTMLElement> = T & Component & WebComponentLifecycle;

// 组合静态类型
export type WebComponentConstructor<T extends HTMLElement> = Constructor<WebComponentInstance<T>> &
  WebComponentStatic;

/**
 * Web Components 适配器
 * 将组件原型转换为 Web Component 类
 */
export const WebComponentAdapter = <Props extends Record<string, PropType>>(
  prototype: Prototype<Props>
): WebComponentConstructor<HTMLElement> => {
  return class extends HTMLElement implements Component {
    private _lifecycle = new WebLifecycleManager();
    private _attributeManager = new WebAttributeManager();
    private _statesManager = new WebStateManager(this, this._attributeManager);
    private _renderManager = new WebRenderManager(this);
    private _propsManager = new WebPropsManager<Props>(this, {});
    private _eventManager = new WebEventManager(this);
    private _contextManager: WebComponentContextManager = new WebComponentContextManager(this);

    private _eventCommands = new WebEventCommands(this._eventManager);

    private _renderer = new WebRenderer({
      eventManager: this._eventManager,
      attributeManager: this._attributeManager,
      lifecycleManager: this._lifecycle,
      stateManager: this._statesManager,
      propsManager: this._propsManager,
    });

    private _isDestroyed = false;
    private _setupResult: PrototypeSetupResult | void;
    private _setupPhase: boolean = true;
    private _pendingContextOperations: PendingContextOperation[] = [];

    private _pendingProps: Record<string, any> | null = null;
    private _pendingPropListeners: Array<{
      props: (keyof Props)[];
      callback: (props: Partial<Props>) => void;
    }> = [];

    // Component 接口实现
    get element(): Element {
      return this;
    }

    get [EVENT_MANAGER_SYMBOL]() {
      return this._eventManager;
    }

    get props() {
      return this._propsManager;
    }

    get state() {
      return this._statesManager;
    }

    get [CONTEXT_MANAGER_SYMBOL]() {
      return this._contextManager;
    }

    constructor() {
      super();

      attachComponent(this, this);

      // 执行 setup 获取结果
      this._setupResult = prototype.setup(this.createHooks()) ?? {};
      if (this._setupResult?.expose) {
        Object.entries(this._setupResult.expose).forEach(([key, value]) => {
          // 跳过已存在的属性
          if (key in this) {
            console.warn(
              `[WebComponentAdapter] Property "${key}" already exists on the component, ` +
                'exposing it will override the original property.'
            );
          }
          // 暴露 API
          Object.defineProperty(this, key, {
            value,
            configurable: true,
            enumerable: true,
          });
        });
      }
      this._setupPhase = false;

      // 触发 created 回调
      this._lifecycle.trigger('created');
    }

    private checkSetupPhase(name: string) {
      if (!this._setupPhase)
        throw new Error(`${name} can only be called at the root of the prototype.`);
    }

    private createHooks(): PrototypeHooks<Props> {
      return {
        useCreated: (cb) => {
          this.checkSetupPhase('useCreated');
          this._lifecycle.add('created', cb);
        },
        useDestroyed: (cb) => {
          this.checkSetupPhase('useDestroyed');
          this._lifecycle.add('destroyed', cb);
        },
        useMounted: (cb) => {
          this.checkSetupPhase('useMounted');
          this._lifecycle.add('mounted', cb);
        },
        useUnmounted: (cb) => {
          this.checkSetupPhase('useUnmounted');
          this._lifecycle.add('unmounted', cb);
        },
        useUpdated: (cb) => {
          this.checkSetupPhase('useUpdated');
          this._lifecycle.add('updated', cb);
        },

        markAsTrigger: () => {
          this.checkSetupPhase('markAsTrigger');

          this._eventManager.markAsTrigger();
        },

        watchAttribute: (name, callback) => {
          this.checkSetupPhase('watchAttribute');
          this._attributeManager.watch(name, callback);
        },

        useState: (initial, attribute, options) => {
          this.checkSetupPhase('useState');
          return this._statesManager.useState(initial, attribute, options);
        },

        watchState: <T>(state: State<T>, callback: (newValue: T, oldValue: T) => void) => {
          this.checkSetupPhase('watchState');
          const originalSet = state.set;
          state.set = (value: T) => {
            const oldValue = state.value;
            originalSet.call(state, value);
            callback(value, oldValue);
          };
        },

        watchProps: (props, callback) => {
          this.checkSetupPhase('watchProps');
          this._pendingPropListeners.push({ props, callback });
        },

        h: (type: ElementType, props?: ElementProps, children?: ElementChildren[]) => {
          return this._renderer.createElement(type, props, children);
        },

        // Context hooks
        provideContext: <T>(
          context: Context<T>,
          initialValue: T | ((update: (value: Partial<T>, notify?: boolean) => void) => T)
        ): void => {
          this.checkSetupPhase('provideContext');
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
          this.checkSetupPhase('watchContext');
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

          insert: (list, element, index) => {
            if (!this._lifecycle.hasTriggered('mounted')) {
              throw new Error(
                'element.insert can only be called after the component is mounted. ' +
                  'Please use it in mounted or later lifecycle hooks.'
              );
            }
            if (element === undefined) element = this;

            // 如果提供了 index，直接使用
            if (index !== undefined) {
              list.splice(index, 0, element);
              return index;
            }

            // 否则根据 DOM 顺序插入
            const currentIndex = binarySearch(list, element, (a, b) => {
              const position = a.compareDocumentPosition(b);
              if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                return -1; // a 在 b 前
              } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                return 1; // a 在 b 后
              }
              return 0; // a 和 b 相同
            });

            // 如果元素已在列表中，先移除
            if (list.includes(element)) {
              list.splice(list.indexOf(element), 1);
            }

            // 插入到正确位置
            list.splice(currentIndex === -1 ? list.length : currentIndex, 0, element);
            return currentIndex === -1 ? list.length - 1 : currentIndex;
          },
        },

        event: this._eventCommands,

        defineProps: (defaultProps: Props) => {
          this.checkSetupPhase('defineProps');
          this._pendingProps = defaultProps;
        },
      };
    }

    static get observedAttributes() {
      return prototype.observedAttributes || [];
    }

    private _handlePendingProps() {
      if (this._pendingProps) {
        this._propsManager.defineProps(this._pendingProps as Props);
        this._pendingProps = null;
      }
    }

    private _handlePendingPropListeners() {
      // 处理所有待处理的监听器
      this._pendingPropListeners.forEach(({ props, callback }) => {
        this._propsManager.onPropsChange((newProps) => {
          const changedProps = props.reduce((acc, key) => {
            acc[key] = newProps[key];
            return acc;
          }, {} as Partial<Props>);
          callback(changedProps);
        });
      });
      this._pendingPropListeners = [];
    }

    connectedCallback() {
      if (this._isDestroyed) return;

      // 初始化 props
      this._propsManager.initialize();
      this._handlePendingProps();

      this._handlePendingPropListeners();

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
                  consumer[CONTEXT_MANAGER_SYMBOL].setConsumedValue(
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
      this._statesManager.flushAttributes();

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
        if (element) {
          this._renderManager.update(element);
        }
      }
    }

    adoptedCallback() {
      // 空实现即可，因为我们不需要处理这个生命周期
    }

    // 提供给外部的渲染控制方法
    requestRender(): void {
      if (!this._isDestroyed) {
        this._renderManager.requestRender();
      }
    }

    forceRender(): void {
      if (!this._isDestroyed) {
        this._renderManager.forceRender();
      }
    }

    destroy() {
      if (this._isDestroyed) return;

      this._isDestroyed = true;
      this._lifecycle.trigger('destroyed');

      // 清理资源
      this._lifecycle.clear();
      this._statesManager.clear();
      this._renderManager.clear();
      this._eventManager.clearAll();
      this._contextManager.destroy();
    }
  };
};
