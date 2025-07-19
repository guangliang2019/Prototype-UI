# 如何编写一个新的原型？

当你确定你需要编写一个新的原型，而非基于现有原型进行二次开发，可以按照如下步骤逐步推进。

## 0. 站在社区的肩膀上

出于学习的目的，我们接下来会实现一个简易的 `MyButton` 原型，但 Proto UI 更希望开发者们可以不用再写一遍 Button 的基础逻辑，所以实际生产中更推荐这样进行二次开发。

```typescript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    // 融合 Button 的所有默认行为
    asButton(p);

    return () => {
      const root = p.view.getElement();
      basicClass = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
      hoverClass = `data-hover:bg-indigo-500/90`;
      activeClass = `data-active:bg-indigo-600/90`;
      focusClass = `data-focus:ring-1 data-focus:ring-ring`;

      root.className = [basicClass, hoverClass, activeClass, focusClass].join(' ');
    };
  },
});
```

但上述代码里会有一些需要了解的 API，所以让我们来再写一遍 Button 吧。

## 1. 最基础的原型结构

我们以 TS 化的 Prototype API 为例，最基础的原型结构是这样的

```typescript
import { definePrototype } from 'proto-ui/core';

// definePrototype 接受一个对象来作为原型的初始化依据
const MyComponentPrototype = definePrototype({
  // 推荐以 kebab 形式对原型进行命名
  name: 'my-component',
  // setup 是描述组件交互的主要部分，它提供一个非常重要的参数 p，但是这个例子没有使用它
  setup: (p) => {
    // setup 可选返回一个函数，这个函数通常被称为 render 函数，用于指导渲染
    // 你也可以什么都不返回，但不论如何，根节点一定会被渲染出来
    return () => {};
  },
});
```

## 2. 原型的渲染语法

每个原型都有一个不可去除的根节点，如果你的原型 `name` 提供的是 `'my-component'`，那么一定会有一个实际叫做 `my-component` 的节点出现。所以很多时候在 DOM 只有一个时，你完全不需要编写额外的元素，只需要在渲染里操纵根节点的样式即可。

操纵样式的方式推荐使用 Tailwind 语法，我们以一个 Button 模样的组件为例

```typescript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    return () => {
      // 使用 p.view.getElement 来获取根节点的引用
      const root = p.view.getElement();
      // 下面的样式在大多数情况下含义为：
      // 高度 36px、左右内边距 16px、上下内边距 8px
      // 小号文本、medium 字重、白色文字
      // 背景色为靛青 500 号色
      // 指针样式改成“手”
      root.className = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
    };
  },
});
```

这样我们就完成了一份最基础的，只能渲染不能互动的按钮原型。

## 3. 加入交互事件

如果我们想让 `my-button` 能够回应点击行为，比如说在被点击时在控制台打印 `"clicked"`，我们可以使用 `p.event` 模块来做。

> 请留意不要写到渲染函数里，定义原型的交互这一行为，多数情况只需要定义一次，不需要每次渲染都重新定义

```typescript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: () => {
    // 使用 p.event.on 添加对交互事件的回应
    // 下列语法的含义为，当前原型会回应 click 交互，click 发生后执行 () => p.debug.log("clicked")
    // 你也可以使用 p.event.off 取消对交互事件的回应。它较为少见一点，因为在组件销毁时，所有 on 状态的交互会自动被 off
    p.event.on('click', () => p.debug.log('clicked'));

    return () => {
      const root = p.view.getElement();
      root.className = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
    };
  },
});
```

## 4. 添加自定义配置

`my-button` 原型现在只能在被点击时，打印固定的 `"clicked"` 字符串，这显然不符合我们对于 Button 组件的预期，它应该能接受调用者传入的自定义函数，并在被点击时执行它。

我们可以用 `p.props` 来定义原型的自定义配置

```typescript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    // p.props.define 接受一个对象，作为配置的默认值
    // 对象里的每个属性都会成为向外暴露的配置
    // 下面的语法意思为，为原型定义一组配置，其中包括 onClick 这一项，用户没传入 onClick 时其默认值是 () => {}
    // p.props.define 能够被重复调用，如果遇到了配置冲突会在控制台抛出提示（仅开发模式下，且可以选择性关闭冲突校验）
    p.props.define({
      onClick: () => {},
    });

    p.event.on('click', () => {
      // 可以通过 p.props.get 在任何晚于 setup 的时机，获取调用者传入的真实的 props
      const { onClick } = p.props.get();
      onClick();
    });

    return () => {
      const root = p.view.getElement();
      root.className = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
    };
  },
});
```

通过这样方式生成的原型，可以被 React 或者其他框架的使用者用以下形式使用:

```jsx
<MyButton onClick={customHandleClick}><MyButton>
```

## 5. 为原型赋予状态

原型经常有许多的交互状态，比如说被光标悬浮、被激活、被聚焦(还区分是否是无障碍强化的样式)。对于这些重绘需求，Proto UI 为原型提供了比 Render 函数更高效的重绘方式————状态系统。

首先先展示一个相对低效的做法，不借助状态系统

```typescript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    // props
    p.props.define({ onClick: () => {} });

    // 这里是我们用来记录 UI 状态的变量
    let _hover = false;
    let _active = false;
    let _focus = false;

    // event
    p.event.on('click', () => {
      // 可以通过 p.props.get 在任何晚于 setup 的时机，获取调用者传入的真实的 props
      const { onClick } = p.props.get();
      onClick();
    });

    p.event.on('pointerenter', () => {
      _hover = true;
      // 在 Proto UI 中，每一次渲染都需要手动触发，开发者需要对每一次的渲染负责
      // 相比 MVVM 的前端框架而言，这让开发者更容易的察觉渲染的性能问题
      // 当然也更加伤神了，你不会想在写基础组件之外的场景用全手动渲染的
      p.view.update();
    });

    p.event.on('pointerleave', () => {
      _hover = false;
      p.view.update();
    });

    p.event.on('focus', () => {
      _focus = true;
      p.view.update();
    });

    p.event.on('blur', () => {
      _focus = false;
      p.view.update();
    });

    p.event.on('pointerdown', () => {
      _active = true;
      p.view.update();
    });

    p.event.on('pointerup', () => {
      _active = false;
      p.view.update();
    });

    return () => {
      const root = p.view.getElement();
      basicClass = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
      hoverClass = 'bg-indigo-500/90';
      activeClass = 'bg-indigo-600/90';
      focusClass = 'ring-1 ring-ring';
      root.className = [
        basicClass,
        _hover && hoverClass,
        _active && activeClass,
        _focus && focusClass,
      ].join(' ');
    };
  },
});
```

上述实现方式中，我们在许多交互事件发生时，调用了 `p.view.update` 重新执行 render 函数，但实际上原型可以把状态暴露出来，供可能存在的外挂渲染方案识别（例如 Web 的 CSS），这样交互发生时产生的频繁重绘就不会占用前端逻辑的主线程，从而大幅提升组件性能。

```typescript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    // props
    p.props.define({ onClick: () => {} });

    // 现在我们启用了 state 模块，它会在这些状态变化时，给组件打上对应的标记，标记名是自定的
    let _hover = p.state.define(false, 'data-hover');
    let _active = p.state.define(false, 'data-active');
    let _focus = p.state.define(false, 'data-focus');

    // event
    p.event.on('click', () => {
      const { onClick } = p.props.get();
      onClick();
    });

    p.event.on('pointerenter', () => _hover.set(true));
    p.event.on('pointerleave', () => _hover.set(false));
    p.event.on('focus', () => _focus.set(true));
    p.event.on('blur', () => _focus.set(false));
    p.event.on('pointerdown', () => _active.set(true));
    p.event.on('pointerup', () => _active.set(false));

    return () => {
      const root = p.view.getElement();
      basicClass = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
      // 此时状态变化应交给样式系统来响应，所以这些状态附加的 class 直接全量加入即可
      // data-hover: 前缀含义为，这个样式只会在组件存在 data-hover 标记时，才会生效
      hoverClass = 'data-hover:bg-indigo-500/90';
      activeClass = 'data-active:bg-indigo-600/90';
      focusClass = 'data-focus:ring-1 data-focus:ring-ring';
      root.className = [basicClass, hoverClass, activeClass, focusClass].join(' ');
    };
  },
});
```

第二个方案比第一个性能更高，代码也更简洁。除非是必须使用第一种方案的情况，Proto UI 都推荐使用 state 模块来处理渲染。

## 6. 回顾最佳实践

Proto UI 提供了大量的跨平台最佳原型实现，并且都有纯逻辑的方式，可以随意组合，随意拓展，它们一般都叫做 asXxxx。

如果我们真的要实现一个 Button，除了直接使用 ProtoButton 作为 Headless 组件进行再封装（这样写起来主要工作在具体框架一侧，更方便但定制内容没有跨平台能力），也可以使用 asButton 定制自己的按钮原型（完全使用 Proto UI 来编写定制的交互原型，拥有跨越任何技术方案的能力）

```typescript
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    // 融合 Button 的所有默认行为，
    asButton(p);

    return () => {
      const root = p.view.getElement();
      basicClass = 'h-9 px-4 py-2 text-sm font-medium text-white bg-indigo-500 pointer-cursor';
      // asButton 会给组件打上哪些标记，需要查阅文档
      hoverClass = `data-hover:bg-indigo-500/90`;
      activeClass = `data-active:bg-indigo-600/90`;
      focusClass = `data-focus:ring-1 data-focus:ring-ring`;
      // 合并这些字符串
      root.className = [basicClass, hoverClass, activeClass, focusClass].join(' ');
    };
  },
});
```

但上述代码里会有许多需要了解的 API，所以让我们来再写一遍 Button 吧。
