import {
  PrototypeTabs,
  PrototypeTabsContent,
  PrototypeTabsIndicator,
  PrototypeTabsTrigger,
} from '@/prototype/tabs';

class DocTabs extends PrototypeTabs {
  connectedCallback() {
    super.connectedCallback();
    this.className = 'relative mr-auto w-full';
  }
}

class DocTabsContent extends PrototypeTabsContent {}

class DocTabsTrigger extends PrototypeTabsTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.style.transition = 'all 0.09s ease-in-out';
    this.className =
      'inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none';
  }
}

class DocTabsIndicator extends PrototypeTabsIndicator {
  private _getOffsetRight(element: HTMLElement) {
    const el = element;
    const right = el.parentElement!.offsetWidth - (el.offsetWidth + el.offsetLeft);
    return right;
  }

  private _currentTabIndex = 0;
  private __resizeObserver = new ResizeObserver((_) => {
    this.onTabResize(this.contextValues['prototype-tabs']);
  });

  private _leadingDebounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...funcArgs: Parameters<T>) => void {
    let timerId: NodeJS.Timeout | null = null;
    let leadingCall = false; // 标记是否为首次调用

    return function (...args: Parameters<T>): void {
      if (!timerId) {
        // 首次调用时，立即执行
        func(...args);
        leadingCall = true;
      }

      // 清除旧的计时器（如果存在）
      if (timerId) {
        clearTimeout(timerId);
      }

      // 设置新的计时器
      timerId = setTimeout(() => {
        // 如果这是首次之后的调用，则在冷却期结束后执行函数
        if (!leadingCall) {
          func(...args);
        }
        leadingCall = false; // 重置标记
        timerId = null; // 清除计时器
      }, delay);
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.willChange = 'width left right';
    this.__resizeObserver.observe(this.parentElement!);
    this.className = 'absolute -mb-[34px] h-0.5 bg-primary';

    this.onTabResize = this._leadingDebounce((context) => {
      const currentRef = context.tabRefs[context.index];
      this.style.transition = '';
      this.style.left = `${currentRef.offsetLeft}px`;
      this.style.right = `${this._getOffsetRight(currentRef)}px`;
      this.style.width = `${currentRef.offsetWidth}px`;
    }, 100);

    this.onTabChange = (context) => {
      requestAnimationFrame(() => {
        this.style.width = 'unset';
        this.style.transition =
          this._currentTabIndex < context.index
            ? 'left .12s ease-out .09s, right .12s ease-out'
            : 'left .12s ease-out, right .12s ease-out .09s';
        this._currentTabIndex = context.index;
        const currentRef = context.tabRefs[context.index];
        this.style.right = `${this._getOffsetRight(currentRef)}px`;
        this.style.left = `${currentRef.offsetLeft}px`;
      });
    };
  }

  disconnectedCallback() {
    this.__resizeObserver.disconnect();
  }
}

customElements.define('doc-tabs', DocTabs);
customElements.define('doc-tabs-content', DocTabsContent);
customElements.define('doc-tabs-trigger', DocTabsTrigger);
customElements.define('doc-tabs-indicator', DocTabsIndicator);
