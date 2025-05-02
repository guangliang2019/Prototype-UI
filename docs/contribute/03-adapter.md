# 适配器系统

适配器（Adapter）是 Proto UI 中连接原型和具体平台的桥梁。它负责将平台无关的原型转换为特定平台的组件实现。

## Adapter 种类

在 Proto UI 中，Adapter 被分为三大类：

- Web Adapter（React、Vue、Angular、Solid、PureJS、WebComponent 等技术的适配器）
- 原生 Adapter（Flutter、Kotlin、Swift、Qt 等技术的适配器）
- 其他 Adapter（Bash/Zsh 等脚本语言、游戏引擎、其他可进行人机交互的平台与技术的适配器）

## Adapter 构造

Adapter 内部高度模块化，模块划分基本与 setup 章节中的 PrototypeAPI 一致，每个模块在 Adapter 中被称为 Manager。对应 PrototypeAPI 的模块，Adapter 中包含了：

- `PropsManager`
- `StateManager`
- `EventManager` & `GlobalEventManager`
- `ContextManager` & `ContextCenter`
- `RenderManager`
- `LifecycleManager`

除了上述与 p 的能力对应的模块外，Adapter 还包含了下列重要的模块：

- Renderer 渲染器，用于指导将 Prototype 转化为指定技术的元素的过程
- StyleManager 用于将原型的 tailwind 风格样式描述转化为实际样式（Web 平台直接使用 Tailwind CSS，原生平台需要自行实现 StyleManager）
- AttributeManager 属性处理器，用于将 state 的变化表现到元素上，供样式处理器命中并渲染

## Adapter 的编写

Adapter 统一放置在项目的 `src/core/adapters` 目录下，每个 Adapter 以 `@` 字符开头

- 目前只有 Web Component 的 Adapter 是编写完成的
- Web 的各种 Adapter 之间，AttributeManager 是共用的，而 ContextCenter 则是可选共用的
- 对于 Adapter 的编写来说，可以从“如何完成 PrototypeAPI 的构造下手”，具体可参考 WebComponentAdapter 代码
- Adapter 对于 PrototypeAPI 的实现应该尽可能贴近指定技术的原生思想
- 不同的 Adapter 的结构组成可能是有明显差异的，比如说 Web Component 没有 React/Vue 那样的 Context API，Adapter 需要自行实现相关 API 及内部逻辑；Flutter 则没有外置的样式系统，需要单独做样式和渲染模版的处理
- 就开发成本而言，ReactAdapter、VueAdapter 等成型 Web 框架的适配器开发成本较低；WebComponentAdapter 和 JsAdapter 开发难度中等；FlutterAdapter、QtAdapter 这样的开发成本则较高
