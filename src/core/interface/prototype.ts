import { EventCommands } from './event';
import { Context, State } from './managers';
import { Renderer } from './renderer';

/**
 * 可以通过属性监听的类型
 */
export type AttributeValue = string | number | boolean;

export interface PrototypeAPI<Props extends {} = {}, Exposes extends {} = {}> {
  props: {
    define: (props: Props) => void;
    set: (props: Partial<Props>) => void;
    get: () => Props;
    watch: (props: (keyof Props)[], callback: (props: Props) => void) => void;
  };

  state: {
    define: <T>(
      initial: T,
      attributeName?: string,
      options?: {
        serialize?: (value: T) => string;
        deserialize?: (value: string) => T;
      }
    ) => State<T>;
    watch: <T>(state: State<T>, callback: (oldValue: T, newValue: T) => void) => void;
  };

  event: EventCommands;

  view: {
    // 渲染调度相关
    update: () => Promise<void>;
    forceUpdate: () => Promise<void>;
    // 元素相关
    getElement: () => HTMLElement;
    insertElement: (list: HTMLElement[], element?: HTMLElement, index?: number) => number;
    compareElementPosition: (target: HTMLElement, element?: HTMLElement) => number;
  };

  lifecycle: {
    onCreated: (callback: () => void) => void;
    onMounted: (callback: () => void) => void;
    onUpdated: (callback: () => void) => void;
    onBeforeUnmount: (callback: () => void) => void;
    onBeforeDestroy: (callback: () => void) => void;
  };

  context: {
    provide: <T>(context: Context<T>, value: (update: UpdateContext<T>) => T) => void;
    watch: <T>(context: Context<T>, listener?: (value: T, changedKeys: string[]) => void) => void;
    get: <T>(context: Context<T>) => T;
  };

  role: {
    asTrigger: () => void;
  };

  expose: {
    define: <K extends keyof Exposes>(name: K, value: Exposes[K]) => void;
    get: <K extends keyof Exposes>(name: K) => Exposes[K];
  };
}

export interface UpdateContext<T> {
  (value: Partial<T>, notify?: boolean): void;
}

/**
 * 原型配置项
 */
export interface Prototype<Props extends {} = {}, Exposes extends {} = {}, El = Element> {
  /** 组件名称 */
  name: string;
  /** 可观察的属性 */
  observedAttributes?: string[];

  /**
   * 设置函数
   */
  setup: PrototypeSetup<Props, Exposes, El>;
}

/**
 * 原型设置函数的返回值
 */
export type PrototypeSetupResult<El = Element> = (renderer: Renderer<El>) => El | void;

/**
 * 原型设置函数
 */
export type PrototypeSetup<Props extends {} = {}, Exposes extends {} = {}, El = Element> = (
  p: PrototypeAPI<Props, Exposes>
) => PrototypeSetupResult<El> | void;
