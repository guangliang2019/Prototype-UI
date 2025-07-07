# 如何编写一个新的原型？

当你确定你需要编写一个新的原型，而非基于现有原型进行二次开发，可以按照如下步骤逐步推进。

## 1. 最基础的原型结构

我们以 TS 化的 Prototype API 为例，最基础的原型结构为

```typescript
import { definePrototype } from 'proto-ui/core';

// definePrototype 接受一个对象来作为原型的初始化依据
const MyComponentPrototype = definePrototype({
  // 推荐以 kebab 形式对原型进行命名
  name: 'my-component',
  // setup 是描述组件交互的主要部分
  setup: () => {
    const _render = () => null;
    // setup 可选返回一个函数，这个函数通常被称为 render 函数，用于指导渲染
    // 你也可以什么都不返回，但不论如何，根节点一定会被渲染出来
    return _render;
  },
});
```

## 2. 理解原型的渲染语法

原型有一个去不掉的根节点，如果你的原型 `name` 提供的是 `'my-component'`，那么一定会有一个实际叫做 `my-component` 的节点出现。所以很多时候在 DOM 只有一个时，你完全不需要编写额外的元素，只需要在渲染里操纵根节点的样式即可。

操纵样式的方式推荐使用 Tailwind 语法，我们以一个 Button 模样的组件为例

```typescript
const MyButtonPrototype = definePrototype({
  
})

```
