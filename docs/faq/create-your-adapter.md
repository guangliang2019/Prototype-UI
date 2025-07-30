# 如何编写一个新的 Adapter？

编写 Adapter 即将 Prototype 的 API 映射到具体框架的 API，这是 Proto UI 实践过程中极具挑战性和复杂度的一个课题。这篇文章会讲述 Proto UI 官方用于开发 Adapter 的路线，让我们先罗列一下大概需要完成的模块有哪些：

- [ ] 函数主体 `Adapter`
- [ ] 渲染器 `Renderer`
  - [ ] 模版构建函数 `h`
  - [ ] 样式解释器 `Styler`
- [ ] 交互事件管理器 `EventManager`
  - [ ] 全局事件管理器 `GlobalEventManager`
  - [ ] 焦点管理器 `FocusManager`
- [ ] 生命周期管理器 `LifecycleManager`
- [ ] 参数管理器 `PropsManager`
- [ ] 交互状态机管理器 `StateManager`
- [ ] 视图管理器 `ViewManager`
  - [ ] 渲染调度管理器 `RenderManger`
  - [ ] 原生元素管理器 `ElementManager`
- [ ] 上下文通信管理器 `ContextManager`
  - [ ] 上下文订阅管理中心 `ContextCenter`
- [ ] 暴露管理器 `ExposeManager`
- [ ] 开发者功能管理器 `DebugManager`

## 0. 搭建一个 Adapter 的原生运行环境

这可能是最困难的步骤之一，因为原型体系可能还从未登陆过你要登陆的技术，但不论如何，搭建一个**对应技术的空白项目**总是一个好的开始。

- 如果你打算编写 ReactAdapter，你就创建一个新的 React 项目
- 如果你打算编写 QtAdapter，则是创建一个新的 Qt 项目

然后你需要准备一些用于调试的基础原型：

- 如果你要登陆的技术属于 Web 生态，那么恭喜你这一步可以很轻松的完成，因为官方的原型库有专供新 Adapter 测试用的原型，它们在 [TODO: Adapter 开发专用原型目录](链接待补充)
- 如果你发现你要登陆的技术还没有原型储备，那你需要自行编写这些测试用原型了：
  - 由于你要制定一个新平台的原型语法，你可以参考基础的 Proto UI 原型规范，如[TODO: 如何编写一个原型](链接待补充)
  - 你需要参考 Adapter 开发专用原型，它们对于逐步实现一个完整的 Adapter 很有用
  - 这并不急，你可以每写完一个 Adapter 功能模块，补充一个对应的测试原型

## 1. 先建立 Adapter 的基础结构

Adapter 本质是一个纯函数，用于将 Prototype 翻译为 Component 的纯函数。

```typescript
import defineComponent from 'what-ever-frame';

const WhatEverFrameAdapter = (prototype) => {
  return defineComponent({});
};
```

我们需要明确 prototype 的主结构，好知道它如何能够解析为一个对应框架的组件。

prototype 结构十分简单，只有一个 setup 函数和一个 name 属性，分别代表着「对于组件行为的定义」和「组件名称」

此外一个需要注意的点，prototype 的 setup 应在组件创建之前执行，且 setup 的返回值是一个被称为 render 的函数，其是「对组件渲染逻辑的描述」

```javascript
import defineComponent from 'what-ever-frame';

const MyComponentPrototype = definePrototype({
  name: 'my-component',
  setup: (p) => {},
});

const WhatEverFrameAdapter = (prototype) => {
  // 你需要对接每一个 Prototype API 的语法，并提供给 prototype.setup 调用
  // 但 Prototype API 比较复杂，我们暂时先用一个空对象顶替一下，后续再逐步实现它们
  const _p = {};
  const _render = prototype.setup(p);
  return defineComponent({});
};

// 使用案例
// 当然目前这种实现程度，Prototype 内部有任何的语法都会报错，因为我们提供给 setup 的 p 还没实现任何实质能力
const WhatEverFrameMyComponent = WhatEverFrameAdapter(MyComponentPrototype);
```

## 2. 编写 Renderer

恭喜你进行到这里，各种前置工作基本已经完成，新的难关即将来临，Renderer 将会是编写 Adapter 过程中遇到的首个大模块。

为了能够得到视觉反馈（这对 GUI 程序的调试至关重要），在着手提供 p 之前，我们得先实现 Renderer 的 h 函数。

h 的功能是用于描述一个原型对应的渲染结构：

```javascript
const MyComponentPrototype = definePrototype({
  name: 'my-component',
  setup: (p) => {
    return (h) =>
      h('div', { style: 'bg-black' }, [h('span', { style: 'text-white' }, ['Text Content'])]);
  },
});
```

如果你开启了原型的 JSX 支持，结构看起来会更加干净一些，但你就察觉不到 h 的存在了，实际上这只是 h 的优化写法。

```jsx
const MyComponentPrototype = definePrototype({
  name: 'my-component',
  setup: (p) => {
    return () => (
      <div style="bg-black">
        <div style="text-white">Text Content</div>
      </div>
    );
  },
});
```

编写 h 要做的事情就是，将上面对于渲染的描述，以及对于元素属性的描述，转化为对应技术的渲染元素:

```ts
const h: <FE = FrameworkElement>(
  tagName: string,
  props: Record<string, any>,
  children: (Prototype | FE | string | number | null | undefined)[]
) => FE;
```

完成了基础的定义工作后，让我们把半成品 Renderer 先接到主流程里；记得每当你完成 Adapter 的一个功能模块，都需要回到主流程里将新模块挂载进去。不然你很难调试这部分模块的行为。

Renderer 模块的接入位置非常关键，因为它决定了 setup 返回的 render(h) 中，h 是一个什么样的函数。

我们建议你将 Renderer 的实现作为参数注入 setup 阶段返回的 render 函数中：

```ts
const WhatEverFrameAdapter = (prototype) => {
  const _p = {}; // 目前还没有实现 p 的各个模块
  const render = prototype.setup(_p); // 返回的是一个接受 h 的函数
  const h = createRenderer(); // 创建你刚刚完成的 h 函数
  return defineComponent({
    name: prototype.name,
    render: () => render(h), // 执行渲染逻辑
  });
};
```

在实际项目中，你可能会希望把 h 包装得更复杂一点，比如将 styler 系统也包含进去，或者进行一层缓存包装，但对于刚开始调试 Adapter 的开发者来说，这样的基本结构已经足够。

编写 Renderer 和 h 可能是一个相当复杂的工作，特别是对于和 Proto UI 原型语法差异较大的技术，下面我们会展开几个可能遇到的难点进行讲解。

### 2.1 关于 style 的处理

如果你编写的技术属于 Web 平台，2.1 小节可以跳过，因为 Web 平台的 h 函数在 style 处理上不会有太大麻烦。

但如果你编写的是 Flutter 这样的原生语言，那么 style 问题便成为早期必须开始着手解决的问题。

Proto UI 默认使用 Tailwind CSS 的语法作为跨平台的样式描述方案。其语法十分简洁，详细语法可以参考 [Tailwind CSS](https://tailwindcss.com/)，这里我们只围绕讲解简单举例。

比如说原型的语法可能是这样

```html
<div class="flex flex-col items-start">
  <div class="bg-white text-zinc-900 font-medium text-2xl">Hello, Proto UI</div>
  <div class="bg-white text-zinc-700">样式系统对齐 Tailwind CSS</div>
</div>
```

显然每个 div 标签的 class 与 style 在 Flutter 里，我们都需要单独对待

我们期望的等效 Flutter 元素结构应该是:

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Container(
      color: Colors.white,
      child: Text(
        'Hello, Proto UI',
        style: TextStyle(
          color: Color(0xFF18181B), // text-zinc-900
          fontWeight: FontWeight.w500,
          fontSize: 24,
        ),
      ),
    ),
    Container(
      color: Colors.white,
      child: Text(
        '样式系统对齐 Tailwind CSS',
        style: TextStyle(
          color: Color(0xFF3F3F46), // text-zinc-700
        ),
      ),
    ),
  ],
)
```

可以看到，我们需要为 Tailwind 的每个类名准备一个对应的 Flutter 映射方案。你可以按需构建一份「类名 => Flutter 属性」的映射表，或者考虑集成已有的 Tailwind-to-Dart 工具链（如有）。不过在 Adapter 的早期阶段，建议你只支持最常用的一小部分类名，逐步推进。

此外，对于 Flutter 这样对 StatefulWidget 与 StatelessWidget 拥有明显性能策略区分的技术而言，我们建议你在 h 函数中只返回 StatelessWidget。这不仅更贴近原型的无状态渲染模型，也更利于后续的组合与缓存优化；

而对于样式系统，如果你打算将 Tailwind 的类名提前转译为 Flutter 的样式片段，我们建议你构建一个「可预装的样式中间层」，我们称之为 styler。它将在后续的 p.state 模块中发挥重要作用，尤其是在涉及 --style-variant 一类静态装饰状态的结构替换时，详细内容我们会在 state 模块的建设中展开。

### 2.2 关于事件(?)的处理

你可能会遇到一些疑惑，比如说，我们的模版里是不是要提供绑定事件的能力？比如说至少要允许函数作为某个子节点的属性，像是 `onClick`，这看起来需要不少额外的处理。

但 Proto UI 的哲学要求没有独立原型的节点 **不具备任何交互**，反过来则要求 **任何具备独立交互的元素应独立拥有一个原型**。简单来说，如果一个元素需要挂载 `onClick` 事件，那实际上 Proto UI 官方只允许你通过新建一个子原型来完成这样的需求。

> 那如果需要给 render 中的某个子节点提供“当前节点存在时才使用的特殊 props” 要怎么办？这种需求在 Proto UI 中通过 Context 系统来完成，并不依赖模版解析。

### 2.3 关于 slot

`h('slot')` 可以看作是 Proto UI 的 h 语法里的一个保留字，它只有一个作用：用于**标记**如果当前组件未来可以拥有子元素，这些子元素被插入到哪个位置，`slot` 的 children 为没有子节点时的默认元素，`slot` 不支持 props，且原型在运行时，同时只允许有一个 `slot` 生效。它类似于：

- React 的 children，但不允许多处同时存在
- Vue 的默认插槽，但不允许传值
- Flutter 很多组件向外暴露的 `Widget[] children` 参数

如果一个组件没有 `slot`，其默认拒绝所有子元素。

顺带一提，`slot` 是 Proto UI 里罕有的“没有实际元素的元素”之一，它只有逻辑上的标记作用，必须在运行时阶段完全被消除。

### 2.4 关于根节点和缺省 render

每个 Proto UI 原型都必须具备一个唯一、不可移除的“根节点”，该节点是该原型在运行时生成的实际渲染对象（如 DOM、View、GameObject 等）。它不是虚拟节点或声明结构，而是最终可绑定事件、承载状态、参与渲染布局的实体节点。

```js
const ComponentWithRenderPrototype = definePrototype({
  name: 'component-with-render',
  setup: () => {
    return (h) => h('div', {}, ['Component with render']);
  },
});
```

实际的渲染结果会是如下情况，有一个无法移除的 `<component-with-render>` 元素，它是真实元素，会出现在最终的渲染结果里。

```html
<component-with-render>
  <div>Component with render</div>
</component-with-render>
```

当我们不去写 render 的时候，实际上等效于以 `(h) => h('slot')` 作为 render

```js
const ComponentWithoutRenderPrototype = definePrototype({
  name: 'component-without-render',
  setup: () => {
    // 不返回 render 等效于：
    // return (h) => h('slot')
  },
});
```

```html
<component-without-render></component-without-render>
```

要注意，根节点必须是最终渲染输出中的 **实际 DOM/GUI 元素**，而不能是渲染过程中的中间表示（如虚拟节点、Fiber、VNode 等）。。举个例子：

- VueAdapter 中提供的根节点，其类型为 DOM 而不是 VNode
- ReactAdapter 提供的根节点，类型也是 DOM 而不是 Fiber 节点
- FlutterAdapter 应以 RenderObject / Element 为根节点类型，而非 Widget
- Qt/QML 应以 QQuickItem 或 QWidget 为根节点类型
- Unity UI 应以 GameObject（带 UI 组件）为根节点类型
- Android View 应该使用 View 及其子类、iOS UIKit 应该使用 UIView

强烈建议在 Adapter 的实现中，保留一个用于获取“根节点引用”的方法，这对于后续实现 `p.event` 和 `p.view` 都很有用。

## 3. 编写 EventManager

在编写完基础的 `Renderer` 后，下一个推荐搭建的模块是 `EventManager`，它是专门用来提供 `p.event` 相关 API 的模块。

我们不必追求一次写成，先以 **能调试最基础的交互事件** 为目标即可。比如说，我们可以先只是支持 `click` 事件。

我们的 EventManager 提供后，应该支持运行这样的原型：

```javascript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    p.event.on('click', () => {
      console.log('my-button clicked!');
    });

    return (h) => {
      const cls = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
      return h('div', { class: cls }, [h('slot')]);
    };
  },
});
```

上述原型用到了 `p.event.on` 方法，它被用于对某个交互事件添加要执行的函数。此外模版解析部分用到了不少 `Renderer` 段落提及的能力点，如果你暂时还未支持它们（比如 Flutter 对于 Tailwind CSS 格式样式的适配、用 slot 标记未来的子元素插入位置等），可以视情况改造测试用例，以便专注于调试 event 模块。

除了 `p.event.on` 之外，event 模块最常用的另一个 API 是 `p.event.off`，它可以用于移除某个添加过的回调函数。除了这两个 API 之外，其他的 API 都可以“先放放”，等到我们把所有模块都建设个雏形再去完善。

### 3.1 将原型指定的事件，托管到原型的根节点

每个原型都会对应至少一个 **实际渲染的元素**，且原型的“子结构”只被看作是附属品，只能设置样式，不能添加事件，所以所有的 p.event 所实际指代的元素，都是当前原型的根节点。

在 [2.4 关于根节点和缺省 render]() 这个小节有提及到关于根节点的构造，如果原型没有留出根节点，请先修改 Renderer 以及 Adapter 的主体实现，让原型至少会渲染出一个实际元素来。

也有不少框架，其根节点就绪的时间较晚，Proto UI 期望根节点在 setup 阶段，也就是 created 生命周期之前就能访问根节点的引用，在 mounted 时可以实际操纵根节点；显然像是 Vue 和 React 这样的框架其根节点的实际就绪时间要推迟到 mounted，
