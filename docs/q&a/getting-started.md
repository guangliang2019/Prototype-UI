# Getting Started (Q&A)

# 所以，如果我想要用 Proto UI 来做事，我需要学习原型怎么编写吗？

不，大概率是不用的！

Proto UI 内置了足够多的原型，目前除了复杂的统计图表类组件外，原型库已有原型能实现常规组件库的全覆盖，所以更推荐用 `src/components/prototype` 下的已有原型

此外，Proto UI 希望能够一劳永逸的解决社区维度的组件库重复建设问题，按照 Proto UI 的设想，当 Proto UI 初具体系之后，只要社区中有人做过类似的原型，你就不需要自己学习原型如何编写。这就和使用 Headless UI 用起来并不需要使用者明白其如何实现一样。

# Proto UI 现阶段为什么不提供安装？

现阶段的 `src/core` 部分还不够稳定，我们还会频繁的对其进行重构，所以如果你需要集成我们的项目，我们推荐你直接 copy 一份 `src/core` 文件夹下的源码到自己的项目中使用。

# 如何使用 core 目录下的文件

`src/core` 目录下的内容，通常只需要关注两个目录。

其一是 `src/core/adapters`，这里放置了所有目前支持的 Adapter，每个 Adapter 的根目录均以 `@` 字符开头，并可能存放于较深层级（这里的文件层级起到分类的作用），例如 React 的 Adapter 位于 `src/core/adapters/web/@react` 目录下，而 Flutter 的 Adapter 则位于 `src/core/adapters/@flutter` 下（少了一层用于分类的 `/web` 目录）

其二是 `src/core/behaviors`，它**只在你需要编写高度定制化的原型时才更加有用**，这里放置了以 hooks 形式写就的基础组件的原型，在 Proto UI 的体系中，它们也被称为 as-hook、role 或者 behavior，这个文件夹下可以理解为是各种可以复用的交互逻辑单元。例如我们提供了 Button 的基础原型，那么在 behavior 里面就能找打 asButton 这个钩子，你能用它为任意原型赋予 Button 的交互行为。
