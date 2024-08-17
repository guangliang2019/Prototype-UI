class WebsiteAside extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 
    /* html */`
      <aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div class="relative overflow-hidden h-full py-6 pr-6 lg:py-8">

        </div>
      </aside>
    `
  }
}

customElements.define('website-aside', WebsiteAside);