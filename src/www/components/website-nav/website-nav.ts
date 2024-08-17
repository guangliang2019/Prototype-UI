import '@/headless/tab';
import { HeadlessTabIndicator } from '../../../headless/tab';

export default class WebsiteNav extends HTMLElement {
  private _navItemsCls =
    'cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60 data-[selected]:text-foreground';

  connectedCallback() {
    this.innerHTML =
      /* html */
      `
      <header class="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 max-w-screen-2xl items-center">
          <span class="font-bold mr-6">shadcn/web</span>
          <nav id="website-nav-links" class="relative flex items-center gap-4 text-sm lg:gap-6">
            <headless-tab-trigger style="z-index: 10;" value="docs" class="${this._navItemsCls}">Docs</headless-tab-trigger>
            <headless-tab-trigger style="z-index: 10;" value="components" class="${this._navItemsCls}">Components</headless-tab-trigger>
            <headless-tab-trigger style="z-index: 10;" value="blocks" class="${this._navItemsCls}">Blocks</headless-tab-trigger>
            <headless-tab-trigger style="z-index: 10;" value="charts" class="${this._navItemsCls}">Charts</headless-tab-trigger>
            <headless-tab-trigger style="z-index: 10;" value="themes" class="${this._navItemsCls}">Themes</headless-tab-trigger>
            <headless-tab-trigger style="z-index: 10;" value="examples" class="${this._navItemsCls}">Examples</headless-tab-trigger>
            <headless-tab-trigger style="z-index: 10;" value="colors" class="${this._navItemsCls}">Colors</headless-tab-trigger>
            <headless-tab-indicator id="tab-indicator" class="absolute -mx-2 rounded-md h-8 bg-indigo-500"></headless-tab-indicator>
          </nav>
        </div>
      </header>
    `;

    const tabIndicator = document.getElementById('tab-indicator') as HeadlessTabIndicator;
    console.log(tabIndicator, 'tabIndicator');

    console.log(tabIndicator);
    let _currentTabIndex = 0;
    tabIndicator.onTabResize = (context) => {
      requestAnimationFrame(() => {
        const currentRef = context.tabRefs[context.index];
        tabIndicator.style.right = `${getOffsetRight(currentRef)}px`;
        tabIndicator.style.left = `${currentRef.offsetLeft}px`;
      });
    };

    tabIndicator.onTabChange = (context) => {
      requestAnimationFrame(() => {
        if (_currentTabIndex < context.index) {
          tabIndicator.classList.add('tab-indicator-forward');
          tabIndicator.classList.remove('tab-indicator-backward');
        } else {
          tabIndicator.classList.add('tab-indicator-backward');
          tabIndicator.classList.remove('tab-indicator-forward');
        }
        _currentTabIndex = context.index;
      });
    };

    function getOffsetRight(element: HTMLElement) {
      const el = element;
      console.log(el.parentElement)
      console.log(el.parentElement!.offsetWidth, el.offsetWidth ,  el.offsetLeft)
      const right = el.parentElement!.offsetWidth - (el.offsetWidth + el.offsetLeft);
      console.log(right, "right")
      return right;
    }
  }
}

customElements.define('website-nav', WebsiteNav);
