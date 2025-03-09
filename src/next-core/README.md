# Next Core

这是 Prototype UI 的核心实现，主要包含以下几个部分：

## 设计理念

### 手动控制的渲染系统

不同于 React 或 Vue 的自动响应式更新，本项目采用完全手动控制的渲染机制：

1. **显式渲染控制**
   - 渲染必须通过 `requestRender` 或 `forceRender` 显式触发
   - Props 变化、State 变化、Context 更新均不会自动触发渲染
   - 开发者对每次渲染时机负有完全责任

2. **性能优先**
   - 避免不必要的渲染
   - 精确控制更新时机
   - 支持细粒度的 DOM 更新策略

### 状态管理

1. **State**
   - 仅用于关键的状态机或 UI 控制
   - 状态变化可直接映射到 DOM 属性，无需触发重渲染
   - 在 prototype 中可以自由使用变量保持状态
   ```typescript
   // 示例：
   function setup(hooks) {
     // 普通状态，不需要响应式
     let counter = 0;
     
     // 关键 UI 状态，需要同步到 DOM
     const uiState = hooks.useState("normal");
     
     return {
       increment() {
         counter++;
         // 需要更新时手动请求渲染
         hooks.requestRender();
       }
     };
   }
   ```

2. **Props**
   - 外部传入的参数
   - Props 变化不会自动触发更新
   - 组件可以自由决定如何响应 Props 变化
   ```typescript
   function setup(hooks) {
     hooks.onPropsChange((props) => {
       // 自行决定是否需要更新
       if (shouldUpdate(props)) {
         hooks.requestRender();
       }
     });
   }
   ```

## 目录结构

```
src/next-core/
├── adapter/        # 平台适配层
├── prototype/      # 组件原型定义
├── hooks/          # 通用 hooks
├── utils/         # 工具函数
└── context.ts     # Context 系统
```

## 核心概念

### 组件原型 (Prototype)

组件原型是一个平台无关的组件描述，它定义了组件的：

1. **Setup 阶段**
   - 初始化状态
   - 注册事件处理器
   - 设置 Props 变化处理
   - 返回组件的公共接口

2. **Render 阶段**
   - 完全独立的渲染逻辑
   - 手动控制的更新时机
   - 精确的 DOM 操作

### 生命周期

1. **基础生命周期**
   - created：组件创建完成
   - mounted：组件挂载到 DOM
   - unmounted：组件从 DOM 移除
   - destroyed：组件销毁

2. **渲染相关**
   - beforeRender：渲染前的准备工作
   - afterRender：渲染后的清理工作
   注意：不推荐使用 updated 生命周期，因为它与手动渲染控制的理念不符

### Hooks

Hooks 是组件原型与适配器之间的接口，主要包括：

1. **渲染控制**
   - requestRender：请求下一帧渲染
   - forceRender：强制立即渲染

2. **状态管理**
   - useState：创建关键 UI 状态
   - onStateChange：监听状态变化

3. **属性管理**
   - watchAttribute：监听 attribute 变化
   - onPropsChange：监听 props 变化
   - getProps：获取当前 props

4. **Context**
   - provideContext：提供 Context
   - watchContext：监听 Context
   - getContext：获取 Context 值

## 最佳实践

1. **状态管理**
   - 只将必要的 UI 状态使用 `useState`
   - 其他状态使用普通变量
   - 在需要更新时显式调用 `requestRender`

2. **Props 处理**
   - 明确定义 Props 更新策略
   - 不依赖 Props 变化自动更新
   - 在必要时手动触发渲染

3. **渲染控制**
   - 精确控制渲染时机
   - 优先使用 DOM 属性更新
   - 避免不必要的重渲染

4. **性能优化**
   - 最小化 `useState` 的使用
   - 合理批量处理更新
   - 优先使用属性同步而非重渲染

## 工作流程

1. 开发者定义组件原型
2. 适配器将原型转换为具体平台的组件
3. 组件通过 hooks 与平台交互
4. 适配器处理平台特定的实现细节

## 设计原则

1. **平台无关性**
   - 组件原型不应依赖特定平台的 API
   - 所有平台特定的操作都通过 hooks 进行

2. **类型安全**
   - 完整的 TypeScript 类型定义
   - 编译时类型检查

3. **渐进式能力**
   - 基础功能简单易用
   - 高级功能按需引入

4. **开发体验**
   - 友好的错误提示
   - 完整的开发工具支持

## 注意事项

1. Props 系统
   - 属性名使用 camelCase
   - 可反射属性自动同步到 attribute（kebab-case）
   - 复杂类型属性不会同步到 attribute

2. 生命周期
   - 遵循特定的调用顺序
   - 避免在不恰当的生命周期中使用某些 hooks

3. Context
   - Provider 必须在 Consumer 之前创建
   - Context 值的更新是同步的
   - 注意内存泄漏的处理 