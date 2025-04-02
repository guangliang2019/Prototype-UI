# 适配器层

适配器层负责将平台无关的组件原型转换为特定平台的组件实现。

## 核心设计理念

### 1. 手动控制的渲染系统

适配器层需要提供精确的渲染控制机制：

```typescript
interface RenderManager {
  // 请求在下一帧渲染
  requestRender(): void;
  
  // 强制立即渲染
  forceRender(): void;
  
  // 渲染回调
  beforeRender?: () => void;
  afterRender?: () => void;
}
```

### 2. 状态系统

状态系统分为两类：

1. **DOM 状态**
   - 通过 `useState` 创建
   - 变化时自动同步到 DOM 属性
   - 不触发组件重渲染
   ```typescript
   interface StateManager {
     // 创建状态，可选是否同步到 attribute
     useState<T>(initial: T, attributeName?: string): State<T>;
   }
   ```

2. **普通状态**
   - 在 prototype 中使用普通变量
   - 完全由开发者控制
   - 需要更新时手动触发渲染

### 3. Props 系统

Props 系统的主要职责：

```typescript
interface PropsManager {
  // 获取当前 props
  getProps<T>(): T;
  
  // 序列化 props 到 attributes
  serializeToAttribute(name: string, value: any): string | null;
  
  // 从 attribute 反序列化到 props
  deserializeFromAttribute(name: string, value: string): any;
  
  // 监听 props 变化
  onPropsChange(callback: (props: any) => void): void;
}
```

## 目录结构

```
adapter/
├── interface.ts     # 核心接口定义
├── context.ts      # Context 系统实现
├── props.ts        # Props 系统类型定义
└── web-component/  # Web Components 适配器实现
    ├── index.ts    # 适配器入口
    └── managers.ts # 功能管理器
```

## 核心接口

### ComponentInstance

组件实例的基本接口：

```typescript
interface ComponentInstance extends HTMLElement {
  // 组件引用标识
  componentRef: Element;
  
  // 销毁回调注册
  useDestroy?: (callback: () => void) => void;
  
  // 上下文变化通知
  contextChanged?: (key: symbol, value: any, changedKeys: string[]) => void;
}
```

### State

状态对象接口：

```typescript
interface State<T> {
  // 只读的当前值
  readonly value: T;
  
  // 更新状态值
  set(value: T): void;
}
```

## 功能管理器

### 1. PropsManager

属性系统管理器：

```typescript
class WebPropsManager implements PropsManager {
  // 存储原始 props 值
  private props: Record<string, any>;
  
  // 属性变化回调
  private changeCallbacks: Set<(props: any) => void>;
  
  // 序列化配置
  private serializationRules: Record<string, SerializationRule>;
  
  constructor(defaultProps: Record<string, any>) {
    this.props = { ...defaultProps };
  }
  
  // 实现 PropsManager 接口...
}
```

### 2. StateManager

状态管理器：

```typescript
class WebStateManager implements StateManager {
  // 状态存储
  private states: Map<string, State<any>>;
  
  // attribute 同步配置
  private attributeSync: Map<string, string>;
  
  // 创建状态
  useState<T>(initial: T, attributeName?: string): State<T> {
    // 实现...
  }
}
```

### 3. RenderManager

渲染管理器：

```typescript
class WebRenderManager implements RenderManager {
  private renderQueued = false;
  private instance: ComponentInstance;
  
  requestRender() {
    if (!this.renderQueued) {
      this.renderQueued = true;
      queueMicrotask(() => this.render());
    }
  }
  
  private render() {
    // 实现渲染逻辑...
  }
}
```

## Web Components 适配器

### 属性处理

1. **Props 到 Attribute 的映射**
   ```typescript
   // camelCase 到 kebab-case 的转换
   userName -> user-name
   
   // 值的序列化
   object -> JSON.stringify
   function -> 不序列化
   primitive -> toString
   ```

2. **Attribute 变化处理**
   ```typescript
   attributeChangedCallback(name, old, value) {
     // 1. 反序列化值
     const propValue = this.props.deserializeFromAttribute(name, value);
     
     // 2. 更新 props
     this.props.update(name, propValue);
     
     // 3. 不自动触发渲染
   }
   ```

### 生命周期处理

```typescript
class WebComponent extends HTMLElement {
  constructor() {
    // 1. 创建管理器
    this.props = new WebPropsManager(defaultProps);
    this.state = new WebStateManager();
    this.render = new WebRenderManager(this);
    
    // 2. 调用 setup
    this.setupResult = prototype.setup({
      useState: this.state.useState.bind(this.state),
      requestRender: this.render.requestRender.bind(this.render),
      // ...其他 hooks
    });
  }
  
  // 其他生命周期方法...
}
```

## 最佳实践

1. **状态管理**
   - 优先使用 DOM 属性更新而非重渲染
   - 只为关键 UI 状态创建 State 对象
   - 合理使用 attribute 同步功能

2. **渲染优化**
   - 批量处理渲染请求
   - 避免不必要的 DOM 操作
   - 使用 DocumentFragment 优化批量操作

3. **内存管理**
   - 及时清理事件监听
   - 使用 WeakMap/WeakSet 存储实例相关数据
   - 在组件销毁时清理所有引用

## 扩展适配器

要实现新的平台适配器，需要：

1. 实现所有管理器接口
2. 提供平台特定的组件基类
3. 实现属性的双向绑定
4. 实现事件系统
5. 实现渲染系统

例如实现 React 适配器：

```typescript
export class ReactAdapter implements Adapter {
  name = 'react';
  
  adapt(prototype: Prototype): React.ComponentType {
    return class extends React.Component {
      // 实现适配逻辑
    };
  }
}
``` 