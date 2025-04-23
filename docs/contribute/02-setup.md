# Setup 原型系统

## 核心特性

### 1. 交互行为抽象

原型系统将组件的交互行为抽象为几个核心概念：

```typescript
interface Prototype<Props, States, Actions, Exposes> {
  name: string;
  observedAttributes?: string[];
  setup: (p: PrototypeAPI<Props>) => PrototypeSetupResult<States, Actions, Exposes> | void;
}

interface PrototypeSetupResult<States, Actions, Exposes> {
  states?: States;
  actions?: Actions;
  exposes?: Exposes;
  render?: (renderer: RendererAPI) => Element | void;
}
```

首先明确，原型也是围绕着组件这一概念展开的，原型在被适配器处理过后，会变成对应平台的组件，所以原型本身可以看作是技术无关的交互组件。

主要 API 包含下列的几大部分：
- props: 原型的属性与配置，是原型与开发者/设计师的交流途径，实际语义更像是 Options 或者 API，举例：
  - button 的 variant 可以取 primary、secondary、outlined 等，variant 是 button 的 props
  - button 的 disabled 属性可以取 true 或 false，默认为 false，disabled 是 button 的 props

- state: 原型向外部表示的状态，是原型与样式体系交流的途径，且本身也有存储状态的能力，实际语义更像是 FSM，每个 state 都有成为组件内部独立的 FSM 的能力，举例：
  - button 有 hover 状态，hover 状态影响其表现或行为，hover 可以取 true 或 false，hover 是 button 的一个 state，且是一个独立的状态机（不与其他状态干扰），每个 state 同时只能持有一个值（状态机内部，状态之间互斥）
  - button 有 disabled 状态，disabled 状态影响其表现或行为，disabled 可以取 true 或 false，disabled 是 button 的一个 state，这里注意，前面提到了 disabled 是 button 的一个 props，这两者并不冲突。
    - disabled 是 props 意味着 button 接受外部属性控制
    - disabled 是 state 意味着 button 在 disabled 持有的值变化时会有不同的行为，且会影响其表现和交互（会向外部表露出来）
  - 关于稍微复杂的状态机，例如 transition 组件有 transition-state，其可以取 'enter' | 'idle' | 'leave' | 'closed' 四个值，这是一个比 true or false 复杂的状态机，状态机的理论可选值并不限制个数，只需保证内部互斥即可

- event: 原型对于用户交互事件的反应，是原型与最终使用者/用户交流的途径，例如：
  - button 会对用户的 click 事件做出回应（执行点击事件）
  - overlay 浮层组件会对结合当前元素的 click 和全局 click 的情况，回应是否关闭浮层

- lifecycle: 原型的生命周期钩子，从原型创建，到适配到实际技术栈组件，再到最后卸载销毁，你可以在任意的时机插入自定义的事务

- context：如果一个交互由多个原型共同协作完成，组件的各个组成部分之间，使用 context 来共享任何的信息，是复杂原型与自身各个组成部分的交流途径，例如：
  - button 会尝试接受的来自 form 的上下文，一旦其发现自己在 form 中且应该收到 form 的管辖，它的表现会与单独使用时不尽相同
  - select 下拉框组件，点击 select-triger 时，select-content 会弹出来；点击 select-options 时，select-content 又会关闭。它们是通过 context 能力互相通知的

- view：原型的视图 API，是原型直接与 GUI 对话的途径， view 包含的功能分为两类：
  - 渲染调度相关：例如请求发起一次渲染、强制执行一次渲染
  - 原生元素相关：获取当前平台渲染时的元素实例，比较实际渲染实例的相对位置，获取具体的渲染结果与数据等

- debug：原型的调试工具，内部功能多种多样，对与开发者很有用，且生产环境下大部分功能会自动摘除，整体功能例如：
  - 控制台打印日志、信息、警告、错误
  - 记录性能信息，模拟压测
  - 添加断点
  - 原型最佳实践检测
  - 可视化状态机、元素描边、标记刷新区域等等

### 2. API 设计

原型系统提供了一套完整的 API 来支持上述核心概念：

```typescript
interface PrototypeAPI<Props> {
  // 属性系统
  props: {
    define: (props: Props) => void;
    set: (props: Partial<Props>) => void;
    get: () => Props;
    watch: (props: (keyof Props)[], callback: (props: Props) => void) => void;
  };

  // 状态系统
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

  // 事件系统
  event: EventCommands;

  // 视图系统
  view: {
    update: () => Promise<void>;
    forceUpdate: () => Promise<void>;
    getElement: () => HTMLElement;
    insertElement: (list: HTMLElement[], element?: HTMLElement, index?: number) => number;
    compareElementPosition: (target: HTMLElement, element?: HTMLElement) => number;
  };

  // 生命周期系统
  lifecycle: {
    onCreated: (callback: () => void) => void;
    onMounted: (callback: () => void) => void;
    onUpdated: (callback: () => void) => void;
    onBeforeUnmount: (callback: () => void) => void;
    onBeforeDestroy: (callback: () => void) => void;
  };

  // 上下文系统
  context: {
    provide: <T>(context: Context<T>, value: (update: UpdateContext<T>) => T) => void;
    watch: <T>(context: Context<T>, listener?: (value: T, changedKeys: string[]) => void) => void;
    get: <T>(context: Context<T>) => T;
  };

  // 角色系统
  role: {
    asTrigger: () => void;
  };
}
```

### 3. 简单示例：Button 原型

```typescript
import { definePrototype } from '@/core';

interface ButtonProps {
  disabled?: boolean;
  autoFocus?: boolean;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

interface ButtonState {
  hover: State<boolean>;
  focus: State<boolean>;
  active: State<boolean>;
}

interface ButtonActions {
  focus(): void;
  blur(): void;
  click(): void;
}

const Button = definePrototype<ButtonProps, ButtonState, ButtonActions>({
  name: 'button',
  observedAttributes: ['disabled', 'auto-focus'],
  
  setup(p) {
    // 1. 定义属性
    p.props.define({
      disabled: false,
      autoFocus: false,
      onClick: () => {}
    });

    // 2. 定义状态
    const hover = p.state.define(false, 'data-hover');
    const focus = p.state.define(false, 'data-focus');
    const active = p.state.define(false, 'data-active');

    // 3. 处理属性变化
    p.props.watch(['disabled'], ({ disabled }) => {
      if (disabled) {
        p.event.focus.setPriority(-1);
        p.event.setAttribute('aria-disabled', 'true');
      } else {
        p.event.focus.setPriority(0);
        p.event.removeAttribute('aria-disabled');
      }
    });

    // 4. 注册事件
    p.event.on('mouseenter', () => hover.set(true));
    p.event.on('mouseleave', () => hover.set(false));
    p.event.on('mousedown', () => active.set(true));
    p.event.on('mouseup', () => active.set(false));
    p.event.on('focus', () => focus.set(true));
    p.event.on('blur', () => focus.set(false));
    p.event.on('click', (e) => {
      const props = p.props.get();
      if (!props.disabled) {
        props.onClick?.(e as MouseEvent);
      }
    });

    // 5. 生命周期处理
    p.lifecycle.onMounted(() => {
      const props = p.props.get();
      if (props.autoFocus) {
        p.event.focus.set(true);
      }
    });

    return {
      states: { hover, focus, active },
      actions: {
        focus() { p.event.focus.set(true); },
        blur() { p.event.focus.set(false); },
        click() { p.event.click(); }
      }
    };
  }
});
```