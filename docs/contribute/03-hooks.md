# Prototype Hooks

Prototype Hooks 是原型系统中用于声明组件行为的核心 API。它提供了一系列钩子函数，用于管理状态、生命周期、事件等。

源文件：[src/next-core/interface.ts](../src/next-core/interface.ts)

## ⚠️ 重要：Setup 执行时机

`setup` 函数的执行时机早于 Component 的创建（更早于 Element 的创建，因为 Element 创建发生在 mount 生命周期，比 create 更晚）。因此：

### 不要这样做 ❌

```typescript
function setup(hooks: PrototypeHooks) {
  // ❌ 错误：此时组件实例还未创建
  const element = hooks.getElement();
  element.focus();

  // ❌ 错误：此时不能操作 DOM
  document.querySelector('#target').appendChild(element);
}
```

### 正确做法 ✅

```typescript
function setup(hooks: PrototypeHooks) {
  // ✅ 正确：在生命周期钩子中访问实例
  hooks.useCreated(() => {
    // 此时组件实例已创建
    const element = hooks.getComponent();
  });

  // ✅ 正确：在 mount 钩子中操作 DOM
  hooks.useMounted(() => {
    // 此时组件已挂载到 DOM
    const element = hooks.getElement();
    element.focus();
  });

  // ✅ 正确：在事件处理器中访问实例
  hooks.useEvent('click', () => {
    const element = hooks.getElement();
    element.classList.add('active');
  });
}
```

### 生命周期顺序

```
setup ──→ created ──→ mounted ──→ unmounted ──→ destroyed
   ↑          ↑          ↑            ↑            ↑
   │          │          │            │            │
   │       Component   Element     Element      Component
   │        创建完成    挂载完成    即将移除      即将销毁
   │
代码执行
```

## Setup 函数

### 函数签名

```typescript
type PrototypeSetup<Props = Record<string, any>> = (
  hooks: PrototypeHooks<Props>
) => PrototypeSetupResult<Props> | void;

interface PrototypeSetupResult<P = Record<string, any>> {
  /** 组件状态 */
  state?: Record<string, State<any>>;
  
  /** 组件动作/方法 */
  actions?: Record<string, (...args: any[]) => any>;
  
  /** 暴露给外部的接口 */
  expose?: Record<string, any>;
  
  /** 渲染函数（实验性） */
  render?: (h: RendererAPI) => Element;
}
```

### 参数：hooks

`hooks` 参数提供了一系列钩子函数，用于声明组件的各种行为：

```typescript
function setup(hooks: PrototypeHooks<Props>) {
  // 1. 状态管理
  const hover = hooks.useState(false);
  
  // 2. 生命周期
  hooks.useMounted(() => {});
  
  // 3. 事件处理
  hooks.useEvent('click', () => {});
  
  // 4. 属性处理
  hooks.onPropsChange(['value'], () => {});
  
  // 5. 上下文使用
  const theme = hooks.useContext(ThemeContext);
}
```

### 返回值

setup 函数可以返回一个对象，包含以下可选字段：

1. **state**：暴露组件的状态
   ```typescript
   return {
     state: {
       hover,    // State<boolean>
       active,   // State<boolean>
       value     // State<string>
     }
   };
   ```

2. **actions**：暴露组件的方法
   ```typescript
   return {
     actions: {
       focus() { /* ... */ },
       blur() { /* ... */ },
       setValue(value: string) { /* ... */ }
     }
   };
   ```

3. **expose**：暴露给外部的其他接口
   ```typescript
   return {
     expose: {
       validate() { /* ... */ },
       reset() { /* ... */ }
     }
   };
   ```

4. **render**：渲染函数（实验性）
   ```typescript
   return {
     render(h) {
       return h('div', { class: 'button' }, [
         h('span', {}, ['Click me'])
       ]);
     }
   };
   ```

### 关于 render 函数

> 注意：render 函数目前是实验性特性，后续可能会优化为更优雅的语法。

当前的 render 函数使用虚拟 DOM 的方式声明渲染逻辑：

```typescript
function setup(hooks: PrototypeHooks) {
  const hover = hooks.useState(false);
  
  return {
    render(h) {
      return h('button', {
        class: {
          'btn': true,
          'btn-hover': hover.value
        },
        onClick: () => hover.set(true)
      }, [
        'Click me'
      ]);
    }
  };
}
```

未来可能会演进为更优雅的声明式语法：

```typescript
// 🔮 未来可能的语法（仅示意）
function setup(hooks: PrototypeHooks) {
  const hover = hooks.useState(false);
  
  return {
    template: `
      <button class="btn" :class="{ 'btn-hover': hover }">
        Click me
      </button>
    `
  };
}
```

或者支持 JSX：

```typescript
// 🔮 未来可能的语法（仅示意）
function setup(hooks: PrototypeHooks) {
  const hover = hooks.useState(false);
  
  return {
    render() {
      return (
        <button className={`btn ${hover.value ? 'btn-hover' : ''}`}>
          Click me
        </button>
      );
    }
  };
}
```

## 核心 Hooks

### 状态管理

```typescript
// 1. 创建状态
const state = hooks.useState<T>(
  initialValue: T,
  attributeName?: string,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
): State<T>

// 示例
const hover = hooks.useState(false, 'data-hover');
const count = hooks.useState(0);
const data = hooks.useState([], 'data-json', {
  serialize: JSON.stringify,
  deserialize: JSON.parse
});
```

### 生命周期

```typescript
// 1. 创建完成
hooks.useCreated(() => {
  // 组件实例创建完成
});

// 2. 挂载完成
hooks.useMounted(() => {
  // 组件已挂载到 DOM
});

// 3. 即将卸载
hooks.useUnmounted(() => {
  // 组件即将从 DOM 中移除
});

// 4. 销毁
hooks.useDestroyed(() => {
  // 组件实例即将销毁
  // 清理资源、解绑事件等
});
```

### 事件处理

```typescript
// 1. 监听事件
hooks.useEvent(
  eventName: string,
  handler: EventHandler,
  options?: {
    passive?: boolean;
    capture?: boolean;
  }
): void

// 2. 触发事件
hooks.emitEvent(
  eventName: string,
  detail?: any
): void

// 示例
hooks.useEvent('click', (e) => {
  if (!disabled) {
    hooks.emitEvent('custom-click', { data: 'value' });
  }
});
```

### 属性处理

```typescript
// 1. 获取当前属性
const props = hooks.getProps<Props>();

// 2. 监听属性变化
hooks.onPropsChange(
  propNames: string[],
  callback: (props: Props) => void
): void

// 示例
hooks.onPropsChange(['value', 'disabled'], (props) => {
  if (shouldUpdate(props)) {
    hooks.requestRender();
  }
});
```

### 上下文

```typescript
// 1. 提供上下文
hooks.provideContext<T>(
  key: symbol,
  value: T
): void

// 2. 使用上下文
const value = hooks.useContext<T>(key: symbol): T

// 3. 监听上下文变化
hooks.watchContext<T>(
  key: symbol,
  callback: (value: T) => void
): void

// 示例
const ThemeContext = Symbol('theme');
hooks.provideContext(ThemeContext, 'dark');
const theme = hooks.useContext(ThemeContext);
```

### 渲染控制

```typescript
// 1. 请求下一帧渲染
hooks.requestRender(): void

// 2. 强制立即渲染
hooks.forceRender(): void

// 示例
function increment() {
  count.set(count.value + 1);
  hooks.requestRender();
}
```

### 实例访问

```typescript
// 获取组件实例
const element = hooks.getInstance(): HTMLElement

// 示例
hooks.useMounted(() => {
  const element = hooks.getInstance();
  element.focus();
});
```

## 最佳实践

1. **状态管理**
   ```typescript
   // 好的做法：UI 状态使用 useState
   const hover = hooks.useState(false, 'data-hover');
   
   // 好的做法：业务数据使用普通变量
   let cache = new Map();
   ```

2. **生命周期处理**
   ```typescript
   // 好的做法：合理清理资源
   hooks.useUnmounted(() => {
     clearInterval(timer);
     unsubscribe();
   });
   ```

3. **事件处理**
   ```typescript
   // 好的做法：考虑性能优化
   hooks.useEvent('scroll', handler, { passive: true });
   
   // 好的做法：事件委托
   hooks.useEvent('click', (e) => {
     const target = e.target as HTMLElement;
     if (target.matches('.item')) {
       handleItemClick(target);
     }
   });
   ```

4. **渲染控制**
   ```typescript
   // 好的做法：批量更新
   function batchUpdate() {
     state1.set(newValue1);
     state2.set(newValue2);
     // 只在最后请求一次渲染
     hooks.requestRender();
   }
   ```

## 类型定义

完整的 hooks 类型定义：

```typescript
interface PrototypeHooks<Props = any> {
  // 状态管理
  useState<T>(initial: T, attribute?: string): State<T>;
  
  // 生命周期
  useCreated(callback: () => void): void;
  useMounted(callback: () => void): void;
  useUnmounted(callback: () => void): void;
  useDestroyed(callback: () => void): void;
  
  // 事件系统
  useEvent(name: string, handler: Function): void;
  emitEvent(name: string, detail?: any): void;
  
  // 属性系统
  getProps(): Props;
  onPropsChange(callback: (props: Props) => void): void;
  
  // 上下文系统
  provideContext<T>(key: symbol, value: T): void;
  useContext<T>(key: symbol): T;
  
  // 渲染控制
  requestRender(): void;
  forceRender(): void;
  
  // 实例访问
  getInstance(): HTMLElement;
}
```

## 注意事项

1. Hooks 只能在 setup 函数中调用
2. 生命周期 hooks 的调用顺序是确定的
3. 状态的初始值最好与类型声明匹配
4. 及时清理不再需要的事件监听和资源
5. 合理使用渲染控制，避免不必要的更新 