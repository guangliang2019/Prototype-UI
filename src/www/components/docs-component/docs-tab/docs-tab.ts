import {
  PrototypeTab,
  PrototypeTabContent,
  PrototypeTabIndicator,
  PrototypeTabTrigger,
} from '../../../../prototype/tab';

class DocsTab extends PrototypeTab {
  constructor() {
    super();
    this._key = 'docs-tab';
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.className = 'relative mr-auto w-full';
  }
}

class DocsTabContent extends PrototypeTabContent {
  constructor() {
    super();
    this._key = 'docs-tab';
  }
}

class DocsTabTrigger extends PrototypeTabTrigger {
  constructor() {
    super();
    this._key = 'docs-tab';
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.transition = 'all 0.09s ease-in-out';
    this.className +=
      ' inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none';
  }
}

class DocsTabIndicator extends PrototypeTabIndicator {
  constructor() {
    super();
    this._key = 'docs-tab';
  }

  private _getOffsetRight(element: HTMLElement) {
    const el = element;
    const right = el.parentElement!.offsetWidth - (el.offsetWidth + el.offsetLeft);
    return right;
  }

  private _currentTabIndex = 0;

  connectedCallback() {
    super.connectedCallback();
    this.className = 'absolute -mb-[34px] h-0.5 bg-primary';

    this.onTabResize = (context) => {
      requestAnimationFrame(() => {
        const currentRef = context.tabRefs[context.index];
        this.style.right = `${this._getOffsetRight(currentRef)}px`;
        this.style.left = `${currentRef.offsetLeft}px`;
      });
    };
    this.onTabChange = (context) => {
      requestAnimationFrame(() => {
        this.style.transition =
          this._currentTabIndex < context.index
            ? 'left .12s ease-out .09s, right .12s ease-out'
            : 'left .12s ease-out, right .12s ease-out .09s';
        this._currentTabIndex = context.index;
      });
    };
  }
}

customElements.define('docs-tab', DocsTab);
customElements.define('docs-tab-content', DocsTabContent);
customElements.define('docs-tab-trigger', DocsTabTrigger);
customElements.define('docs-tab-indicator', DocsTabIndicator);
