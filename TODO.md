# TODO List

## 适配器改进计划

### 目标
改进 WebComponent 适配器，使其产出的组件更符合原生 Web Components 的使用习惯，同时提供必要的内部访问能力。

### 改进内容

#### 1. 类型定义扩展
```typescript
export type WebComponent<Props extends object> = HTMLElement & Component<Props> & {
  // 暴露原型实例，允许访问组件的核心逻辑
  prototype: Prototype<Props>;
  
  // 上下文访问
  getContext: <T>(key: string) => T;
  setContext: <T>(key: string, value: T) => void;
  
  // 属性访问
  props: Props;
  
  // 方法访问
  methods: {
    [key: string]: (...args: any[]) => any;
  };
};
```

#### 2. 使用示例
```typescript
// 原生 Web Components 方式
const tabs = document.querySelector('prototype-tabs');
tabs.setAttribute('value', 'tab1');
tabs.addEventListener('change', (e) => {
  console.log(e.detail);
});

// 内部访问方式
const context = tabs.getContext('tabs');
const props = tabs.props;
tabs.methods.changeTab('tab1');
```

### 实施步骤

1. **准备工作**
   - [ ] 完成 Tabs 组件的重构测试
   - [ ] 确保现有功能稳定
   - [ ] 准备测试用例

2. **适配器改进**
   - [ ] 扩展 WebComponent 类型定义
   - [ ] 实现原型实例暴露
   - [ ] 实现上下文访问方法
   - [ ] 实现属性访问
   - [ ] 实现方法访问

3. **测试验证**
   - [ ] 编写单元测试
   - [ ] 验证原生 API 兼容性
   - [ ] 验证内部访问功能
   - [ ] 性能测试

4. **文档更新**
   - [ ] 更新类型定义文档
   - [ ] 添加使用示例
   - [ ] 更新 API 文档
   - [ ] 添加最佳实践指南

### 注意事项

1. **向后兼容**
   - 确保现有代码不受影响
   - 保持现有 API 可用
   - 提供迁移指南

2. **性能考虑**
   - 评估内部访问的性能影响
   - 优化原型实例的创建
   - 考虑缓存机制

3. **安全性**
   - 控制内部访问权限
   - 防止恶意使用
   - 保护关键数据

4. **使用体验**
   - 保持 API 简单直观
   - 提供清晰的类型提示
   - 添加必要的错误处理

### 时间安排

1. **第一阶段**：Tabs 组件重构测试
   - 目标：确保重构后的 Tabs 组件稳定可用
   - 时间：待定

2. **第二阶段**：适配器改进
   - 目标：实现新的类型定义和功能
   - 时间：Tabs 组件测试完成后

3. **第三阶段**：测试和文档
   - 目标：完善测试和文档
   - 时间：适配器改进完成后

### 相关文件

- `src/core/adapter/web-component.ts`
- `src/core/interface.ts`
- `src/core/constants.ts`
- `src/components/prototype/tabs/`

### 参考资源

- [Web Components 规范](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements 最佳实践](https://developers.google.com/web/fundamentals/web-components/customelements)
- [TypeScript 高级类型](https://www.typescriptlang.org/docs/handbook/advanced-types.html) 