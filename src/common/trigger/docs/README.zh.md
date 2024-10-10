# Trigger

Trigger 触发器，是一个有些难以理解的 **无渲染** 组件，它的主要功能是在多个 Trigger 互相嵌套时，保证最终所有的 DOM 事件都被绑定在最内层的 Trigger 上，从而解决 Trigger 嵌套时可能导致的异常 UI 表现。

# 为什么你应该用 Trigger

如果你参考 Prototype UI 中组件的设计方式，例如

- 将 Tab 拆分为 Tab、TabTrigger、TabContent
- 将 Tooltip 拆分为 Tooltip、TooltipTrigger、TooltipContent
- 等等...

那么你会遇到 Trigger 嵌套现象，用模版语法表示，类似于这样:

```html
<tab-trigger>
  <tooltip-trigger> A TabItem With Tooltip </tooltip-trigger>
</tab-trigger>
```

如果每个 Trigger 都独立处理自己的 DOM 事件，会有很不合理的事情发生，比如：

- 这个组件看似能够获得两次焦点: tab-trigger 和 tooltip-trigger 分别可以获得焦点，不会同时获得焦点
- 也就是说，当前选项获得焦点时，**弹出 Tooltip 和聚焦 TabItem 无法同时发生**

类似的，可能还会出现:

- 一个按钮不同同时拥有 Tooltip 和点击后弹出弹窗，因为 tooltip trigger 与 dialog trigger 嵌套存在冲突
- 右键菜单触发器 context-trigger ，影响内部元素的 DOM 事件，然而这肯定不在使用者的期望内
- ...等等，一切 trigger 嵌套场景都会出现这种情况

**但如果你的 Trigger 触发器，继承于 Trigger 这个组件**，那么就能够解决这些问题。因为多个 Trigger 嵌套时，所有的 DOM 事件都会被绑定在最内层的 Trigger 上，从而解决了这些问题。

# 如何使用 Trigger

Trigger 是一个抽象类，这要求它必须必须被继承，而无法直接实例化。另外，Trigger 继承于 Consumer，因此它需要你提供一个 `_consumerKey`，用于接收可能的上下文信息。

**除了需要继承于它，以及要设置一个 `_consumerKey`，你不需要做任何事情。**

以下是 Web Component 用法的 TS Demo

```ts
class MyComponentTrigger extends Trigger<{}> {
  protected _consumerKeys = ['my-component'];

  connectedCallback() {
    super.connectedCallback();
    this._render();
    // this 连入 DOM 后，你要做什么
  }

  disconnectedCallback() {
    // 从 DOM 树摘除 this 后，你要做什么
    super.disconnectedCallback();
  }

  private _render() {
    // 你的渲染函数
  }
}
```

# 什么时候使用 Trigger

理论上来说，所有涉及到 DOM 监听的组件都应该继承于 Trigger，尤其是那些本身就叫 Trigger 的，**可以被点击的** 或者是 **可以获得焦点的**。

一般来说，Trigger 没有样式，他只是用于管理 DOM 事件以及交互行为。

---

# 更多信息

- 目前 Trigger 只代理了 addEventListener、removeEventListener、dispatchEvent，focus 和 blur 事件。
- Trigger **有且只有一个子元素**
