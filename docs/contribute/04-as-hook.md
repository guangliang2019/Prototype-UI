# asHook

asHook 也称 behavior，是 Proto UI 官方提供的可复用逻辑单元，例如 asButton 就是一个 asHook，它会让当前原型具有 Button 组件的所有所需属性、逻辑与行为。

## 使用案例

例如我想要自定义一款 Button，那么我可以直接调用 asButton，来继承 Proto UI 定义的 Button 应该具备的所有能力

```javascript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    asButton(p);
  },
});
```

使用 asButton 后，当前原型会有如下改变：

- 新增 disabled、onClick 等属性参数
- 添加对 click、touch、focus 等事件的响应
- ARIA 支持

如果你了解面向对象编程（OOP）的话，可以认为 asHook 是一种类似于继承的行为。另外，官方提供的 asHook 是有限且经过严格审核的，以确保能够让使用者引入恰如其分的逻辑。你可以在文档站中查阅到所有 asHook 的具体细节。

## 最佳实践

由于 Proto UI 的主要产物是组件库或者单个组件，所以一般来说，组件库的每一个组件的每一个组成部分，都能在 Proto UI 的 asHook 列表中找到合适的 behavior。

例如 Select 组件的各个部分，分别有 asSelect、asSelectOption、asSelectTrigger、asSelectContent、asSelectIndicator，基本足够覆盖你的所有需要。

## 为什么要使用 asHook

asHook 并不是必要的，但是十分推荐使用至少一个 asHook，因为 asHook 内部包含了对无障碍、跨端兼容、基础逻辑封装的各种优秀实践，asHook 与原型的关系，就像是 Headless UI 之于组件库，它总是一个合适的起点，且能帮你避免未来的诸多问题。

## 获取 asHook 的内部数据

如果你发现自己的原型，找不到任何官方的 asHook 来形容它，那你可以不使用任何的 asHook（也推荐反馈你的使用场景与方式到官方），以 asSelect 系列 asHook 为例，使用 `p.context.watch(SelectContext)` 的方式，你仍然可以与 asHook 的内部逻辑进行对接，从而实现定制化的原型逻辑。

## 使用多个 asHook

使用多个 asHook 是被容许的，例如下拉框的容器组件，可以同时使用 asOverlay 和 asTransition，分别代表着它是“浮层类组件”与“带定制化过渡动画的组件”。

但 asHook 是可能存在冲突的，例如 asSelect 和 asRadio，他们可能使用了相同意义的某个字段（像是 value 或者 disabled）但是做了完全不同的逻辑，甚至为同名的 props 赋予了不同的默认值或数据类型。这样的现象是不允许出现的，因为这说明当前原型的交互本身产生了冲突，ProtoUI 会在任何可能是交互冲突的节点发出警告。
