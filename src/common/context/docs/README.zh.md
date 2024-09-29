# Context

这是一个小巧、高效且功能强大的发布订阅组件，可以让你在复杂的组件层级间，自顶向下的传递数据.

简单来说：

- Provider 有一个 `_providerKey`，Consumer 有一个 `_consumerKey`
- 如果 `_consumerKey` 与 `_providerKey` 相同，且 Provider 包裹了 Consumer，那么 Consumer 会被自动关联到 Provider
- Provider 可以 `setContext`，Consumer 可以通过 `onContextChange` 监听 `setContext` 的调用
- Provider 通过 `_provideValue` 设置上下文数据的值，Consumer 通过 `_contextValue` 获取上下文数据的值

另外：

- Provider 本身也是一个 Consumer，这意味着：
  - Provider 也可以指定 `_consumerKey`，也能够 `onContextChange` 监听外部其他 Provider 传递的上下文
  - 如果 `_consumerKey` 与 `_providerKey` 相同，视为 `_consumerKey` 无效
- 相同 `_providerKey` 且嵌套的多个 Provider，会产生上下文的截断行为

  - 例如整体网站是黑白主题，而局部区域是橘色主题，这是可以实现的
  - Consumer 与 Provider 的订阅关系，会通过 ContextManager 自动维护，无需手动设置

# 使用示例

```ts
interface MyTabContext {
  tabValue: string;
  changeTab: (value: string) => void;
}

class MyTab extends ContextProvider<MyTabContext> {
  protected _consumerKeys = new Set(["my-tab"]);
  protected _providerKeys = new Set(["my-tab"]);

  private _tabValue = '';

  connectedCallback() {
    super.connectedCallback();
    this._tabValue = this.getAttribute('default-value') || '';
    this.setContext({
      tabValue: this._tabValue,
      changeTab: (value) => {
        this.setContext({ tabValue: value });
      },
    });
  }
}

class MyTabTrigger extends Trigger<MyTabContext> {
  protected _consumerKeys = new Set(["my-tab"]);
  private _value = '';

  get value(): string {
    return this._value;
  }

  private _handleTabValueChange = (context: MyTabContext) => {
    if (context.tabValue === this._value) {
      this.tabIndex = 0;
      this.setAttribute('data-selected', '');
    } else {
      this.tabIndex = -1;
      this.removeAttribute('data-selected');
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.style.cursor = 'pointer';
    this._value = this.getAttribute('value') || '';
    // 监听 setContext 的触发
    this.onContextChange = (context) => {
      this._handleTabValueChange();
    };
    // 初始化默认状态
    this._handleTabValueChange(this.contextValue);
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
  }

  private _handleClick = () => this.contextValue.changeTab(this._value);
}

class MyTabContent extends ContextConsumer<MyTabContext> {
  protected _consumerKeys = new Set(["my-tab"]);
  private _value = '';
  get value(): string {
    return this._value;
  }

  private _handleTabValueChange = (context: MyTabContext) => {
    if (context.tabValue === this._value) this.style.display = 'unset';
    if (context.tabValue !== this._value) this.style.display = 'none';
  };

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value') || '';
    this.onContextChange = (context) => {
      this._handleTabValueChange(context);
    };
    this._handleTabValueChange(this.contextValue);
  }
}
customElements.define('my-tab', PrototypeTab);
customElements.define('my-tab-trigger', PrototypeTabTrigger);
customElements.define('my-tab-content', PrototypeTabContent);
```

```html
<my-tab default-value="home">
  <my-tab-trigger value="home">Home</my-tab-trigger>
  <my-tab-trigger value="about">About</my-tab-trigger>
  <my-tab-trigger value="contact">Contact</my-tab-trigger>
  <my-tab-content value="home">Home Content</my-tab-content>
  <my-tab-content value="about">About Content</my-tab-content>
  <my-tab-content value="contact">Contact Content</my-tab-content>
</my-tab>
```

---

# 其他信息

- 尽量减少 Provider 在交互中途插入或删除的操作

  - 因为这会触发对应 key 的 Provider 与 Consumer 之间进行依赖关系的更新，而这个过程要对 Provider DOM 子树进行遍历，性能开销较大。
  - Consumer 的反复插拔，并不会导致性能问题，只有 Provider 的插拔，可能会导致性能问题
  - Provider 寻找 Consumer 是使用遍历 DOM 的方式实现的，而 Consumer 寻找 Provider，是通过事件冒泡实现的。

- Provider 与 Consumer 的上下文数据共享同一个内存地址，所以 Consumer 实际上可以不触发 setContext 而修改上下文数据。当然，这个方法对于 Context 的更改是惰性的，不会立刻触发所有 Consumer 的 onContextChange
  - Consumer 并没有 setContext 方法，Consumer 的某个动作需要触发所有 Consumer 的 onContextChange 时，应该由 Provider 提供一个调用了 Provider 的 setContext 的方法给 Consumer，例如 Demo 中的 changeTab 方法
