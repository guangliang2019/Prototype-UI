# Behavior 组件开发规范

本规范总结了 src/core/behaviors 下所有组件的实现规律，适用于开发新的行为组件（如 as-xxx）。

---

## 1. 目录结构与命名

- 每个组件一个独立文件夹（如 as-slider/、as-select/）
- 组件主文件命名为 as-xxx.ts
- 类型、常量、context 定义放在 interface.ts
- 统一导出放在 index.ts

## 2. 组件实现统一流程

### 2.1 类型与常量定义（interface.ts）

- 定义 Props、Exposes、ContextType 等类型
- 定义默认 props 常量（如 DEFAULT_XXX_PROPS）
- 定义 context（如 createContext）

### 2.2 组件主逻辑（as-xxx.ts）

- 使用泛型：`<Props extends XxxProps, Exposes extends XxxExposes>`
- 统一接收 `PrototypeAPI<Props, Exposes>` 参数

#### 步骤一：props 定义

```ts
p.props.define(DEFAULT_XXX_PROPS as Props);
```

#### 步骤二：state 定义（如有）

```ts
const someState = p.state.define<boolean>(false, 'data-some');
```

#### 步骤三：context 提供（如有）

```ts
p.context.provide(XxxContext, (updateContext) => {
  // 构造 context 对象
  return context;
});
```

#### 步骤四：context 监听（如有）

只能在 setup 顶层调用：

```ts
p.context.watch(XxxContext, (context, keys) => {
  if (keys.includes('value')) {
    // 处理 context 变化
  }
});
```

#### 步骤五：生命周期钩子

```ts
p.lifecycle.onMounted(() => {
  // 只做 DOM 初始化、ref 赋值等
});
```

#### 步骤六：事件监听

```ts
p.event.on('click', handler as EventListener);
```

#### 步骤七：方法暴露

```ts
p.expose.define('focus', () => { ... });
p.expose.define('blur', () => { ... });
```

#### 步骤八：返回值（如有）

部分组件返回 states、render 等对象

---

## 3. 统一注意事项

- context.watch 只能在 setup 顶层调用，不能放在 onMounted/onUpdated/事件回调等
- props/state/context/事件/暴露方法都要类型安全
- 只用 class 控制 DOM 尺寸，避免用 JS 动态设置宽高
- 组件间通信统一用 context
- 事件、暴露方法、生命周期钩子分层清晰
- 组件主逻辑只负责行为，不负责样式

---

## 4. 推荐开发流程

1. 设计 interface.ts，定义类型、context、默认 props
2. 编写 as-xxx.ts，按上述步骤实现
3. 如有子组件，拆分为 as-xxx-yyy.ts，按同样规范实现
4. 在 index.ts 统一导出
5. 保持代码风格、注释、类型一致

---

## 5. 参考模板

```ts
import { PrototypeAPI } from '@/core/interface';
import { XxxContext, XxxProps, XxxExposes, DEFAULT_XXX_PROPS } from './interface';

const asXxx = <Props extends XxxProps, Exposes extends XxxExposes>(
  p: PrototypeAPI<Props, Exposes>
) => {
  p.props.define(DEFAULT_XXX_PROPS as Props);
  // ...state/context/事件/暴露方法等
};

export default asXxx;
```

---

## 6. 组件拆分原则

### 6.1 职责划分

1. **主组件职责**

   - 提供核心 Context
   - 管理全局状态
   - 协调子组件通信
   - 定义组件生命周期

2. **子组件职责**
   - 专注于单一功能
   - 通过 Context 获取状态
   - 通过 Context 触发事件
   - 维护自身局部状态

### 6.2 通信机制

1. **Context 设计**

   - 主组件提供 Context
   - Context 包含共享状态和方法
   - 子组件通过 watch 监听变化
   - 避免直接组件间通信

2. **状态管理**
   - 全局状态放在 Context
   - 局部状态使用 state.define
   - 状态更新通过 Context 方法
   - 避免状态重复定义

### 6.3 组件接口

1. **Props 设计**

   - 主组件定义核心 Props
   - 子组件定义局部 Props
   - Props 类型严格定义
   - 默认值统一管理

2. **Exposes 设计**
   - 主组件暴露核心方法
   - 子组件暴露局部方法
   - 方法命名语义化
   - 避免方法重复暴露

### 6.4 拆分步骤

1. **分析阶段**

   - 识别组件功能边界
   - 确定状态共享需求
   - 规划组件层级关系
   - 设计通信接口

2. **实现阶段**

   - 先实现主组件框架
   - 定义 Context 接口
   - 逐个实现子组件
   - 完善组件间通信

3. **优化阶段**
   - 检查状态管理效率
   - 优化组件重渲染
   - 完善错误处理
   - 添加必要注释

### 6.5 最佳实践

1. **代码组织**

   - 相关文件放在同一目录
   - 统一命名规范
   - 清晰的目录结构
   - 合理的文件拆分

2. **性能考虑**

   - 避免不必要的重渲染
   - 合理使用 Context
   - 优化事件监听
   - 注意内存泄漏

3. **可维护性**
   - 清晰的代码注释
   - 统一的代码风格
   - 完整的类型定义
   - 合理的错误处理

---

> 以上原则适用于复杂组件的拆分，可根据具体场景灵活调整。
