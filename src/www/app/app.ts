// @ts-nocheck
import '../components';
import './components';

export default class AppRoot extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      /* html */
      `
      <div id="app">
        <prototype-tab default-value="docs">
          <website-nav></website-nav>
          <main class="flex-1 flex justify-center">
            <prototype-tab-content value="docs">
              <prototype-tab default-value="Introduction" class="container flex-1 items-start md:gap-8 lg:gap-12">
                <website-aside></website-aside>
                <prototype-tab-content value="Introduction">
                  <main class="flex relative flex-1 py-6 lg:gap-10 lg:py-8 flex-row ">
                    <div class="mx-auto min-w-0">
                      <div class="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
                      <div class="truncate">Docs</div>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                      <div class="text-foreground">Introduction</div>
                    </div>
                    <div class="space-y-2">
                      <h1 class="scroll-m-20 text-3xl font-bold tracking-tight">Introduction</h1>
                      <p class="text-base text-muted-foreground">
                        <span data-br=":r41:" data-brr="1" style="display: inline-block; vertical-align: top; text-decoration: inherit;">Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
                        </span>
                        <script>
                        </script>
                      </p>
                    </div>
                    <div class="pb-12 pt-8">
                      <p class="leading-7 [&:not(:first-child)]:mt-6">The <strong>Web Component</strong> version for shadcn/ui.</p>
                      <p class="leading-7 [&:not(:first-child)]:mt-6">Open Source & Still in development.</p>
                      <p class="leading-7 [&:not(:first-child)]:mt-6">Based on Prototype-UI, a Prototype web component library. It's in development too.</p>
                    </div>
                    </div>
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
                  </main>
                </prototype-tab-content>
                <components-docs></components-docs>
              </prototype-tab>
            </prototype-tab-content>
            <prototype-tab-content style="display: none" value="components"> components </prototype-tab-content>
          </main>
        </prototype-tab>
      </div>
      `;
  }
}

customElements.define('app-root', AppRoot);
