# Prototype 原型系统

## 核心特性

### 1. 交互行为抽象

原型系统将组件的交互行为抽象为几个核心概念：

```typescript
interface Prototype<P = {}> {
  setup(hooks: PrototypeHooks<P>): SetupResult;
}

interface SetupResult {
  // 组件状态
  state?: Record<string, State<any>>;
  // 组件动作
  actions?: Record<string, Function>;
  // 渲染函数（可选）
  render?: (h: any) => any;
}
```

主要包含：
- **状态（State）**：组件的内部状态
- **属性（Props）**：外部传入的配置
- **生命周期（Lifecycle）**：组件的不同阶段
- **事件（Event）**：交互事件的处理
- **上下文（Context）**：跨层级的数据共享

### 2. 组合式声明

采用类似 React Hooks 的方式声明组件行为：

```typescript
function setup(hooks: PrototypeHooks) {
  // 1. 状态声明
  const hover = hooks.useState(false);
  
  // 2. 生命周期
  hooks.useMounted(() => {
    console.log('mounted');
  });
  
  // 3. 事件处理
  hooks.useEvent('mouseenter', () => {
    hover.set(true);
  });
  
  // 4. 上下文使用
  const theme = hooks.useContext(ThemeContext);
  
  return {
    state: { hover },
    actions: { /* ... */ }
  };
}
```

### 3. 手动渲染控制

为了追求极致性能，Prototype UI 采用完全手动的渲染控制：

```typescript
function setup(hooks: PrototypeHooks) {
  const count = hooks.useState(0);
  let total = 0; // 普通变量
  
  // 1. 状态变化不会自动触发渲染
  function increment() {
    count.set(count.value + 1);
    total += 1;
    // 需要手动请求渲染
    hooks.requestRender();
  }
  
  // 2. 属性变化不会自动触发渲染
  hooks.onPropsChange(['value'], (props) => {
    if (shouldUpdate(props)) {
      hooks.requestRender();
    }
  });
  
  // 3. 事件处理需要手动控制渲染
  hooks.useEvent('click', () => {
    doSomething();
    // 仅在需要更新 UI 时请求渲染
    hooks.requestRender();
  });
}
```

这意味着：
- 状态变化不会自动触发渲染
- 属性更新不会自动触发渲染
- 上下文变化不会自动触发渲染
- 开发者需要显式控制每次渲染
- (可以通过适配器实现自动渲染)

### 4. TypeScript 支持

完整的类型定义支持：

```typescript
// 1. 属性类型
interface ButtonProps {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

// 2. 状态类型
interface ButtonState {
  hover: State<boolean>;
  active: State<boolean>;
}

// 3. 动作类型
interface ButtonActions {
  click(): void;
  focus(): void;
}

// 4. 完整的类型定义
const Button = definePrototype<ButtonProps>((hooks) => {
  // 类型安全的 hooks 使用
  const hover = hooks.useState(false);
  const props = hooks.getProps(); // 类型推导为 ButtonProps
  
  return {
    state: { hover },
    actions: { /* ... */ }
  };
});
```

## 示例：Button 原型（附适配到 Web Components）

```typescript
// button.ts
import { definePrototype, WebComponentAdapter } from '@/core';

// 1. 类型定义
interface ButtonProps {
  disabled?: boolean;
  autoFocus?: boolean;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

// 2. 创建原型
const ButtonPrototype = definePrototype<ButtonProps>({}, (hooks) => {
  // 状态定义
  const hover = hooks.useState(false, 'data-hover');
  const focus = hooks.useState(false, 'data-focus');
  const active = hooks.useState(false, 'data-active');

  // 属性处理
  hooks.useMounted(() => {
    const props = hooks.getProps();
    if (props.autoFocus) {
      hooks.getInstance().focus();
    }
  });

  // 事件处理
  hooks.useEvent('mouseenter', () => hover.set(true));
  hooks.useEvent('mouseleave', () => hover.set(false));
  hooks.useEvent('mousedown', () => active.set(true));
  hooks.useEvent('mouseup', () => active.set(false));
  hooks.useEvent('focus', () => focus.set(true));
  hooks.useEvent('blur', () => focus.set(false));
  hooks.useEvent('click', (e) => {
    const props = hooks.getProps();
    if (!props.disabled) {
      props.onClick?.(e as MouseEvent);
    }
  });
});

// 3. 以适配到 Web Components 为例
const Button = WebComponentAdapter(ButtonPrototype);

// 4. 注册自定义元素（Web Components 必要的步骤，其他框架不需要此行为）
customElements.define('ui-button', Button);

// 5. 在 HTML 中使用
// <!-- 在 HTML 中使用自定义元素 -->
// <ui-button disabled="false" onClick={(e) => console.log('clicked')}>
//   Click me
// </ui-button>
//
// <!-- 或在其他框架中使用 -->
// React: <ui-button disabled={false} onClick={handleClick}>Click me</ui-button>
// Vue: <ui-button :disabled="false" @click="handleClick">Click me</ui-button>
```

注意：这是使用 Web Components 实现的示例。Prototype UI 支持多种框架适配器，你可以根据项目需求选择合适的适配器（如 React、Vue 等）。

## 最佳实践

1. **状态管理**
   - 使用 `useState` 管理 UI 状态
   - 使用普通变量管理业务数据
   - 精确控制渲染时机

2. **类型安全**
   - 定义完整的接口
   - 利用 TypeScript 类型推导
   - 避免 any 类型

3. **性能优化**
   - 批量更新状态
   - 条件渲染