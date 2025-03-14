# Managers 系统

Adapter 是 Prototype UI 中最具扩展性的模块之一。本文将详细介绍如何自定义 Adapter 及其子模块系统。

## Adapter 的核心作用

Adapter 主要承担两个核心职责：

1. **提供 Hooks 系统**
   - 向 Prototype 提供标准的 hooks 接口
   - 处理 hooks 的生命周期
   - 管理 hooks 的依赖关系

2. **管理子模块系统**
   - 协调各个 Manager 的工作
   - 将 Prototype 的行为转换为具体平台的操作
   - 提供统一的错误处理和日志

## 核心 Managers

每个 Adapter 都需要实现以下核心 Manager：

### 1. StateManager

负责状态管理和同步：

```typescript
interface StateManager {
  // 创建状态
  useState<T>(initial: T, options?: StateOptions): State<T>;
  
  // 批量更新状态
  batchUpdate(updates: StateUpdate[]): void;
  
  // 监听状态变化
  onStateChange(callback: StateChangeCallback): void;
  
  // 获取状态快照
  getSnapshot(): StateSnapshot;
}
```

### 2. PropsManager

处理属性系统：

```typescript
interface PropsManager {
  // 获取当前属性
  getProps<T>(): T;
  
  // 监听属性变化
  onPropsChange(callback: PropsChangeCallback): void;
  
  // 属性序列化（用于 attribute）
  serialize(name: string, value: any): string | null;
  deserialize(name: string, value: string): any;
}
```

### 3. EventManager

管理事件系统：

```typescript
interface EventManager {
  // 注册事件监听
  addEventListener(
    type: string,
    handler: EventHandler,
    options?: EventOptions
  ): void;
  
  // 触发事件
  dispatchEvent(event: Event): void;
  
  // 事件委托
  delegate(
    selector: string,
    type: string,
    handler: EventHandler
  ): void;
}
```

### 4. LifecycleManager

控制生命周期：

```typescript
interface LifecycleManager {
  // 注册生命周期回调
  onCreated(callback: () => void): void;
  onMounted(callback: () => void): void;
  onUnmounted(callback: () => void): void;
  onDestroyed(callback: () => void): void;
  
  // 触发生命周期
  triggerCreated(): void;
  triggerMounted(): void;
  triggerUnmounted(): void;
  triggerDestroyed(): void;
}
```

### 5. RenderManager

管理渲染系统：

```typescript
interface RenderManager {
  // 请求渲染
  requestRender(): void;
  
  // 强制渲染
  forceRender(): void;
  
  // 渲染回调
  onBeforeRender(callback: () => void): void;
  onAfterRender(callback: () => void): void;
  
  // 获取渲染上下文
  getRenderContext(): RenderContext;
}
```

## 自定义扩展

Adapter 系统的设计允许你对任何部分进行自定义：

### 1. 自定义 Hooks 行为

你可以改变 hooks 的语义和实现：

```typescript
class CustomAdapter extends BaseAdapter {
  // 自定义 useState 行为
  protected createStateHook() {
    return <T>(initial: T) => {
      // 自定义状态管理逻辑
      const state = new CustomState(initial);
      
      // 可以添加额外的功能
      state.subscribe(() => {
        // 比如自动触发渲染
        this.renderManager.requestRender();
      });
      
      return state;
    };
  }
}
```

### 2. 替换 Manager 实现

可以替换任何 Manager 的实现：

```typescript
class CustomAdapter extends BaseAdapter {
  protected createManagers() {
    return {
      // 使用自定义的状态管理器
      state: new CustomStateManager(),
      
      // 复用其他适配器的事件管理器
      event: new WebEventManager(),
      
      // 默认实现
      props: new DefaultPropsManager(),
      lifecycle: new DefaultLifecycleManager(),
      render: new DefaultRenderManager(),
    };
  }
}
```

### 3. 更改渲染策略

你可以实现不同的渲染策略：

```typescript
class MVVMAdapter extends BaseAdapter {
  protected createRenderManager() {
    return new MVVMRenderManager({
      // 启用自动渲染
      autoRender: true,
      
      // 配置依赖收集
      trackDependencies: true,
      
      // 自定义更新策略
      updateStrategy: 'immediate' | 'batch' | 'debounce'
    });
  }
}
```

### 4. 适配新平台

创建新平台的适配器：

```typescript
class FlutterAdapter extends BaseAdapter {
  constructor() {
    super();
    
    // 可以复用其他适配器的部分实现
    this.stateManager = new WebStateManager();
    this.eventManager = new WebEventManager();
    
    // 实现平台特定的管理器
    this.renderManager = new FlutterRenderManager();
    this.propsManager = new FlutterPropsManager();
  }
  
  // 实现平台特定的方法
  protected createFlutterWidget() {
    // ...
  }
}
```

## 最佳实践

1. **模块化设计**
   - 每个 Manager 职责单一
   - 保持接口一致性
   - 方便替换和复用

2. **性能优化**
   - 实现批量更新
   - 优化事件委托
   - 减少不必要的渲染

3. **错误处理**
   - 提供清晰的错误信息
   - 实现优雅的降级策略
   - 保持良好的调试体验

4. **扩展性**
   - 遵循接口约定
   - 提供合理的默认值
   - 支持配置项注入

## 示例：创建自定义适配器

这是一个完整的自定义适配器示例：

```typescript
class CustomAdapter extends BaseAdapter {
  constructor(options: AdapterOptions = {}) {
    super();
    
    // 1. 创建管理器
    this.managers = this.createManagers();
    
    // 2. 初始化配置
    this.initOptions(options);
    
    // 3. 建立管理器之间的联系
    this.connectManagers();
  }
  
  protected createManagers() {
    return {
      state: new CustomStateManager({
        // 自定义配置
        batchUpdate: true,
        trackChanges: true
      }),
      
      props: new CustomPropsManager({
        // 属性同步策略
        syncStrategy: 'immediate'
      }),
      
      event: new CustomEventManager({
        // 事件配置
        delegate: true,
        capture: false
      }),
      
      lifecycle: new CustomLifecycleManager(),
      
      render: new CustomRenderManager({
        // 渲染策略
        mode: 'manual',
        batchSize: 10
      })
    };
  }
  
  protected connectManagers() {
    // 示例：状态变化时请求渲染
    this.managers.state.onStateChange(() => {
      this.managers.render.requestRender();
    });
    
    // 示例：属性变化时触发生命周期
    this.managers.props.onPropsChange(() => {
      this.managers.lifecycle.triggerUpdate();
    });
  }
}
``` 