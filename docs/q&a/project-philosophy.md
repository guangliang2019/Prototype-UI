# Proto UI Philosophy (Q&A)

# What is Proto UI

Proto UI 是一种用“原型”描述交互组件的方式，让你可以一次定义，自动生成 React、Vue、Flutter 等各种平台的组件。

项目正处于开发阶段，暂未发布，具体进度请参考[里程碑](https:proto-ui.com/milestone)，欢迎[参与共建](https://github.com/Proto-UI/Proto-UI/blob/main/docs/contribute/05-contribute.md)！

# Proto UI 的模块结构是怎样的？

目前项目主要由三部分组成：

- **原型建模语言（Prototype）**：定义中立 UI 元素的结构、表现与行为；
- **适配器（Adapter）**：负责将原型翻译为具体平台代码；
- **工具链（Compiler / Runtime）**：支持编译时生成和运行时加载。

本篇文档主要讲的是设计理念，具体模块结构可参考 [项目结构说明](https://proto-ui.com/docs/structure)。

# 这是一个前端/客户端框架吗？或者是一种新的语言？

不是。Proto UI 不是框架，也不是一门新的语言，而是一种 UI 建模方式。每个原型都采用对应目标平台的语言编写，例如：

- React / Vue 使用 JS/TS 格式的原型；
- Qt 使用 C++ 格式的原型；
- Flutter 使用 Dart 格式的原型。

尽管语言不同，不同语言的 Proto UI 的原型在语义上是 100% 等效的，可以无损转换。

换句话说，Proto UI 是一种脱离具体技术栈、统一组件行为表达的思维方式。只要遵循 Proto UI SDK 定义的结构规范，用什么语言都可以。

[Button 的 JS 原型与 Dart 原型的对比图](https://proto-ui.com/docs/img/7315bc6a-9970-4244-9cd4-5cb33acee6b3.png)

# 为什么需要 Proto UI？现有组件方案还不够吗？

绝大多数 UI 技术的底层交互并没有本质区别 —— 一个按钮无非就是响应点击、键盘和触控，但我们却在不同平台上一次又一次地从零实现它。这种“组件复写”现象不仅重复劳动，还带来了适配性差、无障碍支持薄弱、维护成本高等问题。

更麻烦的是，不同技术栈之间的组件实现几乎没有复用空间，哪怕交互逻辑一模一样。比如：

同一个 Select 组件，在 PC 和手机端行为差异大，往往需要完全不同实现；

同一企业内部多个业务线，各自开发着高度相似的组件库，却互不兼容；

许多组件库对屏幕阅读器等辅助设备支持不足，影响可访问性。

Proto UI 的目标是：从交互的本质抽象出“原型”，实现一次建模、多端生成、语义等价、行为一致。

我们相信，描述交互行为应该是一种跨平台、跨语言、跨框架的“基础能力” —— 而不是各自为政的重复劳动。

> 你可以把 Proto UI 看作是「交互设计界的 Markdown」：Markdown 不关心你是用 VSCode 还是 Typora，只关心你要表达的是标题、列表、段落；而 Proto UI 不关心你用 Vue、React 还是 Flutter，只关心你要的是按钮、输入框、选项选择。

# Proto UI 所指的“原型”是什么？

Prototype 原型，是 Proto UI 中的一个核心概念，它代表着某一个 UI 组件，用 **完全中立** 的方式表达出来的形式。这很接近 UX 设计师口中的“原型”的概念，只不过 Proto UI 只专注于基础的交互元素，如按钮、下拉框、输入框等，并不涉及实际生产时常见的产品原型。

下面是 Button 原型在 TS 格式的示例(注：为了文档可读性有所删减，只展示原型中关于键鼠和触屏、阅读器设备的交互逻辑，且不包含表单联动)

```typescript
import { definePrototype } from '@/proto/core';
import { ButtonProps, ButtonExposes } from '@/proto/core/behaviors/as-button';

export const MyButtonPrototype = definePrototype<ButtonProps, ButtonExposes>({
  name: 'my-button',
  setup: (p) => {
    // 状态管理
    const hover = p.state.define<boolean>(false, 'data-hover');
    const focus = p.state.define<boolean>(false, 'data-focus');
    const focusVisible = p.state.define<boolean>(false, 'data-focus-visible');
    const active = p.state.define<boolean>(false, 'data-active');

    // props
    p.props.define(DEFAULT_BUTTON_PROPS as Props);

    const handleDisabledChange = (disabled: boolean) => {
      if (disabled) {
        p.event.focus.setPriority(-1);
        p.event.setAttribute('aria-disabled', 'true');
      } else {
        p.event.focus.setPriority(0);
        p.event.removeAttribute('aria-disabled');
      }
    };

    // 初始属性处理
    p.lifecycle.onMounted(() => {
      const props = p.props.get();
      handleDisabledChange(props.disabled ?? false);

      // 自动聚焦
      if (props.autoFocus) {
        p.event.focus.set(true);
      }
    });

    // 属性同步
    p.props.watch(['disabled'], ({ disabled }) => {
      handleDisabledChange(disabled ?? false);
    });

    // 注册事件监听
    // 鼠标悬停
    p.event.on('mouseenter', () => {
      hover.set(true);
    });
    p.event.on('mouseleave', () => hover.set(false));
    // 鼠标按下
    p.event.on('mousedown', () => active.set(true));
    // 鼠标释放
    p.event.on('mouseup', () => active.set(false));
    // 聚焦
    p.event.on('focus', () => {
      focus.set(true);
      focusVisible.set(active.value);
    });
    p.event.on('blur', () => {
      focus.set(false);
      focusVisible.set(false);
    });
    // 点击
    p.event.on('click', (e) => {
      const props = p.props.get();
      if (!focus.value || props.disabled) return;
      props.onClick?.(e as MouseEvent);
    });
    // 键盘按下
    p.event.on('keydown', (e) => {
      const props = p.props.get();
      if (!focus.value || props.disabled) return;
      const event = e as KeyboardEvent;
      if (event.key === 'Enter' || event.key === ' ') {
        props.onClick?.(event);
      }
    });
  },
});
```

# 它能用来做什么？

> 如果你是组件库开发者/跨端技术方案调研者/无障碍方案推动者，Proto UI 可能对你特别有用

Proto UI 可以通过其基础的原型库，快速拓展一套高度定制化的组件库原型，并自动生成其 Vue2/3、React、Solid、Flutter、Qt... 等各种各样技术的原生实现版本。

目前我们已经实现了 React16+、Vue3 和 Web Component 的适配器，Flutter、Qt、Vue2 以及更多技术方案正在开发中。详情可参考 [适配器列表](https://proto-ui.com/adapters)

相比于人力维护多套组件库或选取 Flutter 这样能跨 4 个平台的技术，Proto UI 的一致性、用户体验、无障碍、技术兼容性、开发效率等各个方面有着更可观的潜力（Proto UI 很快也能支持生成 Flutter 版本的组件库）。

# Proto UI 是如何工作的？

```
Adapter(Prototype) => Component
```

Proto UI 的设计哲学非常简单，由 Adapter 将 Prototype 翻译为各种技术的实现版本，而开发者直接使用生成的产物即可。

此外，Adapter 通常支持编译时和运行时两种模式，编译时模式可以做到真正零开销生成指定技术的组件库代码；运行时模式则能够允许动态加载、修改原型，以及更多灵活的特性，但会有轻微的性能开销。

# 我能试用一下吗？

当然可以。目前 Playground 支持将原型翻译为 React16、Vue3 和 Web Component，这里是一个[基础的 Button 原型翻译为 React 组件的示例](https://proto-ui.com/playground/button?lang=ts&framework=react)

如果你想用于自己的项目，我们更推荐你尝试我们的[代码生成器](https://proto-ui.com/generator)，你可以任意挑选想要的组件库其设计语言和技术方案，并拿到能直接用于项目的成品组件库源码
