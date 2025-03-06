# Prototype UI - Agent 指南

## 项目概述

Prototype UI 是一个 Headless UI 组件库，其核心思想是将组件的交互逻辑与渲染实现分离。项目采用渐进式开发策略，从 Web Components 开始，逐步扩展到其他框架（React、Vue、Qt 等）。

## 核心概念

### 1. 原型层（Prototype Layer）
- 位置：`src/core/components/`
- 作用：描述组件的本质行为和交互逻辑
- 特点：
  - 与具体渲染技术解耦
  - 关注组件的核心功能
  - 提供统一的接口定义
  - 便于跨框架复用

### 2. 适配器层（Adapter Layer）
- 位置：`src/core/adapter/`
- 作用：将原型组件映射到具体的渲染技术
- 特点：
  - 实现框架特定的渲染逻辑
  - 处理生命周期
  - 管理状态同步
  - 提供上下文支持

### 3. 组件实现层（Implementation Layer）
- 位置：`src/components/prototype/`
- 作用：将原型组件通过适配器转换为可用的组件
- 特点：
  - 使用适配器转换原型
  - 提供框架特定的 API
  - 处理样式和主题
  - 实现具体的交互效果

## 架构演进

### 第一阶段：Web Components 直接实现
- 特点：
  - 直接使用 Web Components
  - 逻辑和渲染混合
  - 继承关系复杂
  - 复用性较差
- 示例：`dialog` 组件

### 第二阶段：原型层 + 适配器
- 特点：
  - 引入原型层抽象
  - 使用适配器模式
  - 关注点分离
  - 更好的复用性
- 示例：`button` 组件

## 开发规范

### 1. 原型组件开发
```typescript
// 定义原型接口
interface ButtonPrototype {
  // 核心属性
  disabled?: boolean;
  loading?: boolean;
  
  // 核心方法
  onClick?: () => void;
  render: () => HTMLElement;
}

// 实现原型
const asButton = (props: ButtonProps): ButtonPrototype => {
  // 实现核心逻辑
  return {
    // ...
  };
};
```

### 2. 适配器开发
```typescript
// 使用适配器转换原型
export const PrototypeButton = WebComponentAdapter(definePrototype(asButton));
```

### 3. 组件实现
```typescript
// 导出可用的组件
export { PrototypeButton };
```

## 重构指南

### 1. 识别需要重构的组件
- 直接继承 Web Components 的组件
- 逻辑和渲染混合的组件
- 继承关系复杂的组件

### 2. 重构步骤
1. 创建原型接口
2. 实现原型逻辑
3. 使用适配器转换
4. 更新组件实现
5. 迁移现有功能
6. 添加测试用例

### 3. 注意事项
- 保持向后兼容
- 确保功能完整性
- 添加必要的文档
- 更新示例代码

## 项目状态

### 已完成重构的组件
- Button
- Select
- Tabs（进行中）

### 待重构的组件
- Dialog
- Form
- Input
- Tooltip
- Transition
- ScrollArea
- RadioGroup
- Switch

## 未来规划

### 1. 框架支持
- [x] Web Components
- [ ] 纯 JS 渲染
- [ ] React
- [ ] Vue 2/3
- [ ] Qt

### 2. 功能增强
- 完善原型层接口
- 增强适配器能力
- 添加更多组件
- 改进开发工具

### 3. 文档完善
- 组件文档
- API 文档
- 示例代码
- 最佳实践

## 注意事项

1. 每次对话都是独立的，需要重新建立项目理解
2. 关注项目的渐进式开发策略
3. 理解原型层和适配器层的分离
4. 遵循现有的开发规范
5. 保持代码风格的一致性 