class DocsAnchor extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <div class="hidden text-sm xl:block w-[300px] -ml-8 mt-1">
      <div class="sticky top-16 -mt-10 pt-4">
        <div dir="ltr" class="relative overflow-hidden pb-10" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;">
          <div data-radix-scroll-area-viewport="" class="h-full w-full rounded-[inherit]" style="overflow: hidden scroll;">
            <div style="min-width: 100%; display: table;">
              <div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <div class="space-y-2">
                  <p class="font-medium">On This Page</p>
                  <ul class="m-0 list-none">
                    <li class="mt-0 pt-2">
                      <a href="#faq" class="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">FAQ</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

customElements.define('docs-anchor', DocsAnchor)