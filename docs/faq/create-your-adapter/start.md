# 如何编写一个新的 Adapter？

**面向有平台经验的开发者**

如果你熟悉某个平台（如 React / Flutter / Qt），并希望将 Proto UI 的原型系统登陆到该平台，那么你来对地方了。

这份文档将引导你完成 Adapter 的开发过程，帮助你理解如何将 Proto UI 的结构化描述转译为平台特定的组件，同时构建起渲染、事件、状态等关键模块的支持。

我们建议你从“快速运行最小原型”开始，逐步拆解每一个模块的职责和实现方式。

---

## 📦 一、快速开始：跑起来再说

让我们先构建一个最简单的 Adapter，只实现最基础的渲染能力。

### 1. 创建你的运行环境

无论是 React、Flutter、还是 Qt，请先创建一个空白项目，并确保可以运行并调试自定义组件。

```bash
# 以 React 为例
npx create-react-app proto-adapter-demo
```

### 2. 准备一个测试原型

```ts
const HelloWorld = definePrototype({
  name: 'hello-world',
  setup: () => () => h('div', {}, ['Hello, Proto UI']),
});
```

这个原型的 render 函数描述了一个最基础的 UI 结构：一个带文本的 div。

### 3. 编写最小 Adapter

```ts
export const ReactAdapter = (prototype: Prototype) => {
  const p = {}; // 暂不实现任何 API
  const render = prototype.setup(p);
  const h = (tag, props, children) => React.createElement(tag, props, children);
  return () => render(h);
};
```

### 4. 渲染到平台上

```tsx
const HelloWorldComponent = ReactAdapter(HelloWorld);

export default function App() {
  return <HelloWorldComponent />;
}
```

运行看看能不能看到文本：“Hello, Proto UI”。能看到就说明你的 Adapter 骨架已经打通了！

---

## 🧱 二、模块详解

下面是我们在构建 Adapter 时需要逐步实现的模块。你可以选择按需实现，也可以一步步补全。

### ✅ Renderer：渲染器

```ts
export const ReactAdapter = (prototype: Prototype) => {
  const p = {}; // 暂不传入实际能力模块
  const render = prototype.setup(p);

  const h = (tag, props, children) => {
    return React.createElement(tag, props, children);
  };

  return function RenderedComponent() {
    return render(h);
  };
};
```

你可以将这个 Adapter 直接用在任何原型上，验证 `render(h)` 所构造的结构是否能渲染成功。

```ts
const VisualDebugPrototype = definePrototype({
  name: 'visual-debug',
  setup: () => () =>
    h('div', { class: 'bg-black text-white p-4' }, [h('span', {}, ['Renderer OK'])]),
});
```

推荐你在开发 Renderer 的阶段，将这个原型作为默认挂载的测试目标，确保结构与样式都能被正常转译。

#### 🧭 职责

Renderer 的核心任务是提供 h 函数，它将原型 render 函数中返回的结构描述，转译为平台实际的渲染节点。

```ts
const h: (tag: string, props: Record<string, any>, children: RenderNode[]) => PlatformNode;
```

其中：

- `tag` 是 HTML 标签名或平台元素名，如 'div'、'text'、'slot'
- `props` 是属性字典，包含 class/style 等
- `children` 是原型嵌套结构或字符串等内容

#### ✨ 基本行为

```ts
const h = (tag, props, children) => React.createElement(tag, props, children);
```

对于 React 来说，这样就够了。但如果你使用的不是 DOM 平台（如 Flutter / Qt），你就需要实现更复杂的转译逻辑：

- 将 `class="bg-white text-sm"` 解析为平台样式（通过 Styler 模块）
- 将 `slot` 替换为实际插槽内容
- 将 `text` 或 `div` 等虚拟标签映射到平台组件

#### 🔖 支持插槽 slot

Proto UI 的 h 语法中，`h('slot')` 是保留用法，表示“这里是插槽入口”。你需要：

- 接收 `slot` 子元素的默认内容（即 children）
- 提供位置给实际插入的子原型结构

它不支持传参，不支持命名，仅支持单个 slot 存在。

#### 📌 支持根节点绑定

每个原型在运行时都必须拥有一个 **实际渲染、可操控的根节点**，这不仅用于视觉输出，还承担了样式绑定、事件监听、状态投影等多种职责。

Proto UI 要求 Adapter 最终产出的根节点类型，应该满足以下条件：

- 能够被框架真正渲染到屏幕（例如 React 中是 DOM，不是 VNode；Flutter 中是 Widget，不是 Element）
- 能够响应样式变更（如修改 class 或 style 后会产生实际视觉效果）
- 能够绑定事件（用于后续的 p.event 系统）

对于多数 Web 平台，我们推荐使用真实 DOM 元素作为根节点：

```ts
return () => render(h); // h 应返回 DOM，如 <div> 而非虚拟节点
```

但在某些封装性较强的平台（如 React Native 或需编译的原生 UI 框架）中，也可以允许通过某种桥接机制将框架元素作为根节点，只要你能在生命周期内明确拿到该元素的引用，并确保其具备上述能力。

建议 Adapter 中保留 `getRootElement()` 等能力，以便 EventManager、ViewManager 等模块后续调用。

#### 🎨 支持样式系统（Styler）

Proto UI 默认使用 Tailwind 风格 class 属性，如：

```html
<div class="text-zinc-800 bg-white text-sm font-medium"></div>
```

如果平台本身不支持 class 属性（如 Flutter / Qt），你应实现 styler 模块，将 class 字符串解析为样式字典：

```ts
parseClass('text-zinc-800'); // => { color: '#18181b' }
```

你可以：

- 只支持常用类名，逐步完善
- 将其编译为平台样式对象或嵌套结构

#### ⚠️ 注意事项

- h 函数必须是**纯函数**，不可携带副作用
- h 内部不得绑定事件逻辑（事件交给 EventManager）
- h 不处理状态，仅处理结构

---

### ✅ LifecycleManager：生命周期系统

#### 🧭 职责

LifecycleManager 负责提供 `p.lifecycle.onMounted()` 与 `p.lifecycle.onUnmounted()` 等生命周期钩子，它是连接 Proto UI 生命周期语义与目标框架生命周期的桥梁模块。

虽然看似简单，它是所有模块中唯一需要与其他模块协作运行的部分。正确的生命周期同步是确保事件、状态、视图等能力能在正确时间点初始化或销毁的基础。

此外，一旦该模块完成，你应回溯并更新其他模块中涉及生命周期的时机管理。例如 EventManager 中的事件注册与卸载，应明确挂钩 `onMounted` 与 `onUnmounted`，避免出现生命周期分散导致的重复或遗漏行为。

#### 🔁 生命周期流程

Proto UI 的生命周期流程如下：

```
setup -> create -> mount -> render -> [update]* -> unmount -> destroy
```

其中：

- `setup` 在组件“尚未真正创建”时调用，仅做行为预演
- `mount` 之后，根节点可访问，事件绑定等操作正式开始
- `update` 可多次发生，仅在首次 render 之后、unmount 之前

LifecycleManager 应提供三种能力：

1. `trigger(phase: string)`：标记进入某生命周期
2. `has(phase: string)`：查询是否已进入某生命周期
3. 若生命周期转换不合法（如重复 render，跳过 create），应抛出错误

#### ⚠️ 关于 setup 的生命周期“错位”

你可能注意到 `setup(p)` 的调用时机非常早，甚至早于平台组件实例真正创建：

- React 还未构造函数
- Flutter 尚未执行 build

但原型开发者却可以在 `setup()` 中调用 `p.event.on()`、`p.state.define()` 等逻辑，仿佛一切已经就绪。这种行为看似违背生命周期顺序，实则是出于 Proto UI 的“**预演式设计**”：

> 原型的 setup 执行的是一次对组件生命周期的**声明性建模**。

Adapter 应记录这些操作，并在组件进入合适的生命周期节点（如 mounted）时“正式执行”这些指令。

#### 💥 早期调用应延迟执行 vs 抛出错误

- ✅ `p.event.on()` / `p.lifecycle.onMounted()` / `p.state.define()` 等可以收集
- ❌ `p.view.getElement()` 若在 mount 之前调用，应立即抛错（因访问节点为真）

这要求你在 Adapter 内维护一个生命周期状态流，并让各个模块能够判断当前是否可执行。

建议：在 Adapter 内部构建一个统一的生命周期调度中心，并暴露给所有模块判断当前状态。

---

### ✅ EventManager：事件系统

```ts
const ClickTestPrototype = definePrototype({
  name: 'click-test',
  setup: (p) => {
    p.event.on('click', () => console.log('clicked'));

    return () =>
      h(
        'div',
        {
          class: 'bg-blue-500 text-white p-4 cursor-pointer',
        },
        ['Click me']
      );
  },
});
```

这个原型可以用来验证：

- 事件是否成功绑定
- 点击时是否能够触发监听函数
- 是否在卸载时自动清理监听器（可选）

#### 🧭 职责

EventManager 的任务是提供 `p.event.on` 与 `p.event.off` 等 API，使原型能够注册与移除生命周期范围内的事件监听函数。

其最基础也是最重要的能力，就是实现：

- `p.event.on(type, handler)`：注册事件监听
- `p.event.off(type, handler)`：移除已注册的监听器

所有事件监听都默认挂载在组件的**根节点**上（参见 Renderer 模块对根节点的定义）。

你可以先支持最常见的 DOM 事件（如 click、input），确认它们能被正确触发和清理。

> 建议在完成 LifecycleManager 后，事件的注册与注销应绑定在 `onMounted` / `onUnmounted` 生命周期内，避免泄露或重复绑定。

#### ⚙️ 最小实现

你可以先支持最常见的 DOM 事件（如 click、input）：

```ts
p.event.on = (type, handler, options?) => {
  rootElement.addEventListener(type, handler, options);
  // 可记录事件用于卸载时清理
};

p.event.off = (type, handler, options?) => {
  rootElement.removeEventListener(type, handler, options);
};
```

注意：

- 你应确保在组件销毁时自动移除事件（框架通常提供生命周期钩子）
- 所有事件必须绑定在当前原型的根节点，而不是任意子节点

#### ❗ 不支持的做法

Proto UI 不支持在 h 函数中添加事件（如 `onClick`），事件应显式由原型调用 `p.event.on` 来添加。

```ts
// 🚫 不推荐：事件定义嵌入模版结构
return () => h('div', { onClick: () => doSomething() });

// ✅ 推荐：事件定义写入 setup()
p.event.on('click', doSomething);
```

这保证了原型交互的独立性，并利于事件统一管理、测试与调度。

#### 🔍 拓展能力

除了基本事件监听，你可以考虑扩展：

- `p.event.onGlobal()`：绑定到全局（如 window、document）
- `p.event.once()`：绑定一次后自动解绑
- `p.event.emit()`：触发局部自定义事件（依赖上下文）

但建议在完成核心模块后再添加这些功能。

\---

### ✅ StateManager：状态系统

StateManager 是 Proto UI 最具有“非响应式特征”的模块之一。请不要用传统前端框架中“响应式状态”的思维来理解它。

#### 🧭 职责

Proto UI 的 state 更接近“结构化标签状态”或“装饰标记”。它**不会触发 render 函数执行**，也不会进入调度系统，而是通过外部样式系统或平台定制逻辑来决定如何响应状态变化。

- 在 React 中：React 的状态变化 -> 重新执行 render。
- 在 Proto UI 中：状态变化 -> 设置 `data-*` 或 `--xxx` 属性 -> 样式系统自行响应。

如果你对接的是 Web 平台，这种状态机制通常映射为 DOM 的 `dataset` 与 CSS 变量。

如果你对接的是 Flutter 这种缺乏样式系统的框架，Proto UI 的 state 更像是“静态装饰状态”切换器，需配合 Styler 显式转译。

#### ✅ 实现 `p.state.define()`

这是 state 模块中最核心的能力，作用是向外定义一个状态值。

```ts
p.state.define('--progress', 0);
p.state.define('data-loading', false);
```

约束如下：

- 初始值只能是 `string | boolean | number`
- 名称只能是 `data-*` 或 `--*` 形式

你可以选择：

- 将其映射为 DOM 属性（推荐）
- 记录并交由 Styler 模块统一注入（非 Web 平台）

#### ⚠️ `p.state.watch()` 的定位

这是一个可选能力，用于监听某个状态的值变化。

```ts
p.state.watch('--progress', (value) => console.log(value));
```

尽管实现容易（可以通过订阅机制实现），Proto UI 官方**不推荐在原型中主动监听自身状态**。watch 主要用于跨原型状态响应（如消费外部动画组件暴露的变量等）。

因此建议你在实现中支持该 API，但不强调其使用。

#### 💡 实现建议

- 若你接入的是 Web 平台，可直接使用 DOM API：

  ```ts
  el.dataset.loading = 'true';
  el.style.setProperty('--progress', 0);
  ```

- 若你接入的是非样式驱动平台（Flutter/Unity），建议构建 Styler 模块中介，并在 h/render 中消费状态值。

### ✅ ViewManager：视图信息

ViewManager 是对早期 RenderManager 与 ElementManager 的合并，分为两个基本不相关的部分：

1. 渲染调度（update 与 forceUpdate）
2. 元素引用访问（getElement）

#### 🧭 职责

它主要负责两个职责：

- 主动发起组件渲染（update）
- 提供原型实际根元素的引用（getElement）

这两个能力并不互相依赖，因此实现时可以分别考虑。

#### ✅ 实现 `p.view.update()` 与 `p.view.forceUpdate()`

Proto UI 默认不会因 state、props 或 context 的变化自动重新执行 render。开发者需要主动调用 `p.view.update()` 才会触发重新渲染。

```ts
p.view.update(); // 允许调度策略控制执行时机（可能异步）
p.view.forceUpdate(); // 立即执行，无视调度策略
```

如果你的宿主平台没有调度系统，这两个方法可以等效实现。如果存在（如 React 的调度队列或 Flutter 的 setState 合并调度），则应明确区分：

- `update()` 可异步执行、去重合并
- `forceUpdate()` 必须立即重渲染组件

#### ✅ 实现 `p.view.getElement()`

该方法返回当前原型的实际“根节点”引用，在生命周期的 mount 之后必须返回一个可操作对象。

```ts
const el = p.view.getElement();
// el 是 DOM 元素 / Widget / QQuickItem 等
```

你也可以理解为 `p.view.getRootRef()`，但该接口已规范命名为 `getElement()`，保持一致性。

该方法常用于：

- 外部访问组件本体（调试、样式系统等）
- 事件模块内部获取事件绑定目标
- 样式系统直接操作 DOM 或平台节点

#### ⚠️ 生命周期限制

- 在 `setup()` 阶段访问 `p.view.getElement()` 会抛出错误
- 必须在组件 `mounted` 之后才可以使用

建议你在生命周期系统中注册 root element 创建时机，并在调用该接口时返回缓存值。

### ✅ ContextManager：上下文系统

ContextManager 是 Proto UI 中用于构建跨原型通信关系的核心模块。

它的设计理念源自依赖注入、发布订阅系统。Proto UI 故意抹除了模版传参、跨层属性绑定等手段，就是为了鼓励开发者以更稳定、更松耦合的方式连接复杂组件结构。

#### 🧭 职责

- 提供：任意原型可“提供”某个 context 的值
- 订阅：其子原型可订阅并感知该 context 的变动
- 层级：订阅只能向上传播，且会被中途重新提供者截断
- 时机：context 是在组件结构被“确定”时就建立，而非渲染完成时

这使得你可以在组件创建期（如 `created` 生命周期）就判断是否处于某个 context 范围内。

#### ✅ API 设计

Proto UI 提供三个 context 相关 API：

- `p.context.provide(Context, setupContextFn)`

  - `Context` 是通过 `createContext()` 创建的唯一标识（不能是字符串）
  - `setupContextFn(update) => contextValue` 用于生成初始值，可选地保留 update 方法

- `p.context.watch(Context, callback)`

  - 订阅 context 的变动，任何通过 `updateContext()` 产生的值变化都会触发回调
  - 回调参数通常包括 `changedKey` 与 `newContextValue`

- `p.context.get(Context)`

  - 获取当前组件上下文值（推荐在 `created` 之后调用）
  - 若 context 不存在，会抛出异常

#### 💡 实现建议

- 若宿主平台本身有 context API（如 React Context / Vue Provide/Inject），可以包裹它们实现上述三个 API
- 若宿主没有 context API，可参考 Proto UI 官方 `ContextCenter` 实现：使用原型树结构维护 context 提供与订阅表
- 若宿主平台不是树状结构（如某些 ECS 模型），可用其他映射关系替代上下文传播路径

#### ⚠️ 传播特性

- 子原型可订阅祖先原型的 context，但不会感知平级或子级的 context
- 若多个祖先提供了同名 context，实际生效的是“最近的”那个
- 若你在子原型中再次提供同名 context，会自动阻断来自祖先的 context 传播（即“重定义遮蔽”）

### ✅ PropsManager：参数系统

PropsManager 用于处理原型组件的外部参数传入与内部声明，是 Adapter 在组件生命周期内注入动态数据的关键模块。

#### 🧭 职责与 API

该模块提供三个 API：

- `p.props.define(key, defaultValue)`

  - 在 `setup()` 阶段用于定义 props 的默认值与类型期望
  - 可重复调用，后定义的值覆盖前者；若发生覆盖应给出控制台警告

- `p.props.get(key)`

  - 在任意生命周期中获取 props 的当前值（推荐仅在 created 之后使用）

- `p.props.watch(key, callback)`

  - 监听 props 的变化，仅在 props 变更后执行 callback，不自动触发 render

#### ✅ 示例

```ts
const ButtonPrototype = definePrototype({
  name: 'custom-button',
  setup: (p) => {
    p.props.define('label', 'Default');
    p.props.watch('label', (val) => console.log('new label:', val));
    return () => h('div', {}, [p.props.get('label')]);
  },
});
```

#### ⚠️ 关于 render 的控制

Proto UI 官方 Adapter 不会因 props 变化自动重新执行 render。

你需要：

- 显式在 watch 回调中处理 DOM 或状态更新；
- 或通过重建组件实现 render 更新（某些平台可能更容易）；

当然，如果你希望构建一个“props 变化即触发 render”的 Adapter 也是允许的。Proto UI 并不限制 Adapter 的具体行为，只要满足原型语义。

#### 💡 实现建议

- 在 Adapter 构建组件时注入 props 初值
- 在组件生命周期内管理 props 的更新流与 watch 分发
- 对于框架内置 props（如 React 的 props），可浅拷贝注入后再内部重构结构
- 不建议为 watch 实现复杂的响应式系统，保持回调驱动即可

### ✅ ExposeManager：暴露接口

ExposeManager 提供了原型向外暴露函数或行为的机制，是除了 props 外的另一种外部通信方式。

#### 🧭 职责

- 允许组件通过 `p.expose.define(key, fn)` 主动暴露一个函数接口供外部调用
- 适用于外部调用者希望驱动组件行为而不是传入状态的场景

#### ✅ 示例

```ts
p.expose.define('show', () => {
  p.state.define('data-visible', true);
});

p.expose.define('hide', () => {
  p.state.define('data-visible', false);
});
```

#### 💡 典型用途

- 控制型组件，如 Toast、Dialog、Tooltip 等
- 提供“Imperative Handle”风格接口，如播放器的 play/pause

#### ⚠️ 实现建议

- 所有暴露的 API 应挂载在组件外部引用上（如 DOM、ref、控制面板）
- 可选：允许通过 Adapter 的返回结构公开暴露的方法集合

### ✅ DebugManager：调试功能

DebugManager 用于提供开发期原型调试能力。

#### 🧭 职责

- 提供统一日志接口：`p.debug.log()`、`warn()`、`error()` 等
- 允许 Adapter 抹平跨平台的调试输出（如浏览器 console vs 原生日志系统）
- 可选：提供可视化调试工具，如绘制边界、记录帧率、统计 render 次数

#### ✅ 示例

```ts
p.debug.log('rendering component:', p.props.get('label'));
```

#### 💡 典型调试能力

- 渲染轮廓描边（用于调试局部重绘）
- 生命周期流日志
- 组件嵌套结构追踪

#### ⚠️ 实现建议

- 可通过环境变量或 Adapter 配置控制启用调试模式
- 不建议调试功能污染生产环境输出

---

## 🧪 三、调试建议与最佳实践

- 每完成一个模块，就回到 Adapter 主流程挂载它
- 为每个模块编写一个“原型级别”的测试组件
- 使用日志调试 p 的行为（如 console.log(p.event)）
- 保持最简状态开始，逐步支持复杂语法

---

## 📚 后续阅读

- [如何编写一个新的原型]()
- [样式系统设计哲学]()
- [上下文系统语义与边界]()
- [Proto UI 模型与 HCI 结构对应]()

---

你现在已经具备了开发 Adapter 的完整起点。

记住，每个平台的挑战不同，不需要一步到位。一步步推进，从能“跑出 Hello World”开始，到适配交互、样式、状态管理 —— Adapter 的构建将逐步成为你对平台架构的深入理解过程。

祝你开发顺利。
