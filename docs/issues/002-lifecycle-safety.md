# 生命周期安全性优化

## 背景

在当前的实现中，我们发现了一些生命周期相关的设计问题：

1. `getInstance()` 的严格性导致常规代码需要大量的错误处理
2. `onPropsChange` 过早响应可能导致与生命周期的冲突
3. DOM 操作和状态管理的边界不够清晰

## 问题示例

```typescript
// 当前的实现需要大量错误处理
const handleDisabledChange = (disabled: boolean) => {
  try {
    const element = hooks.getInstance();
    // DOM 操作...
  } catch (e) {
    // 错误处理...
  }
};

// Props 变化可能在组件未准备好时触发
hooks.onPropsChange(['disabled'], ({ disabled }) => {
  handleDisabledChange(disabled ?? false);
});
```

## 可能的解决方案

1. **生命周期感知的 Props 监听**：
   ```typescript
   interface PropsChangeOptions {
     mountedOnly?: boolean;
   }
   
   hooks.onPropsChange(
     ['disabled'],
     callback,
     { mountedOnly: true }
   );
   ```

2. **DOM 操作辅助函数**：
   ```typescript
   hooks.withInstance(
     (element) => {
       // DOM 操作
     },
     { defer: true }  // 未挂载时延迟执行
   );
   ```

3. **状态管理与 DOM 操作分离**：
   ```typescript
   // 状态管理（任何时候）
   const state = {
     disabled: hooks.useState(false)
   };

   // DOM 操作（仅挂载后）
   hooks.useMounted(() => {
     const element = hooks.getInstance();
     updateElementState(element, state.disabled.value);
   });
   ```

## 待解决的问题

1. **API 设计**
   - 是否需要新增生命周期感知的 API
   - 如何平衡安全性和使用便利性

2. **状态同步**
   - Props 到状态的同步时机
   - 状态到 DOM 的同步时机

3. **错误处理策略**
   - 是否需要框架层面的统一处理
   - 如何提供更好的开发体验

## 后续计划

1. 完成当前的重构工作
2. 收集更多使用场景和反馈
3. 设计并实现新的生命周期安全 API
4. 提供迁移指南

## 相关代码

- `src/next-core/hooks/behaviors/as-button.ts`
- `src/next-core/adapter/web-component/index.ts`
- `src/next-core/prototype/interface.ts` 