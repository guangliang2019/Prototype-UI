import '@/headless/tab'
class WebsiteAside extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 
    /* html */`
      <aside class="fixed md:w-[220px] lg:w-[240px] top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div class="relative overflow-hidden h-full py-6 pr-6 lg:py-8">
          <div class="pb-4">
            <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Getting Started</h4>
            <div class="grid grid-flow-row auto-rows-max text-sm">
              <website-aside-item value="Introduction"></website-aside-item>
            </div>
          </div>
          <div class="pb-4">
            <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Components</h4>
            <div class="grid grid-flow-row auto-rows-max text-sm">
              <website-aside-item value="Button"></website-aside-item>
              <website-aside-item value="Tab"></website-aside-item>
              <website-aside-item value="Transition"></website-aside-item>
            </div>
          </div>
        </div>
      </aside>
    `
  }
}

customElements.define('website-aside', WebsiteAside);