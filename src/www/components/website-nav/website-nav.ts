import '@/headless/tab';
import './github-button';

export default class WebsiteNav extends HTMLElement {
  private _navItemsCls =
    'cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60 data-[selected]:text-foreground';

  connectedCallback() {
    this.innerHTML =
      /* html */
      `
      <header class="flex justify-center sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 items-center">
          <span class="font-bold mr-6">shadcn/web</span>
          <nav id="website-nav-links" class="relative flex items-center gap-4 text-sm lg:gap-6">
            <headless-tab-trigger value="docs" class="${this._navItemsCls}">Docs</headless-tab-trigger>
            <headless-tab-trigger value="components" class="${this._navItemsCls}">Components</headless-tab-trigger>
            <headless-tab-trigger value="blocks" class="${this._navItemsCls}">Blocks</headless-tab-trigger>
            <headless-tab-trigger value="charts" class="${this._navItemsCls}">Charts</headless-tab-trigger>
            <headless-tab-trigger value="themes" class="${this._navItemsCls}">Themes</headless-tab-trigger>
            <headless-tab-trigger value="examples" class="${this._navItemsCls}">Examples</headless-tab-trigger>
            <headless-tab-trigger value="colors" class="${this._navItemsCls}">Colors</headless-tab-trigger>
          </nav>
          <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <github-button></github-button>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('website-nav', WebsiteNav);
