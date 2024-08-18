class DocsContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <prototype-tab-content value="Introduction">
      <main class="flex relative flex-1 py-6 lg:gap-10 lg:py-8 flex-row ">
        <div>
          <docs-breadcrumb></docs-breadcrumb>
          <div class="space-y-2">
            <h1 class="scroll-m-20 text-3xl font-bold tracking-tight">Introduction</h1>
            <p class="text-base text-muted-foreground">
              <span style="display: inline-block; vertical-align: top; text-decoration: inherit;">Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.</span>
            </p>
          </div>
          <div class="pb-12 pt-8">
            <p class="leading-7 [&:not(:first-child)]:mt-6">The <strong>Web Component</strong> version for shadcn/ui.</p>
            <p class="leading-7 [&:not(:first-child)]:mt-6">Open Source & Still in development.</p>
            <p class="leading-7 [&:not(:first-child)]:mt-6">Based on Prototype-UI, a headless web component library. It's in development too.</p>
          </div>
        </div>
        <docs-anchor></docs-anchor>
      </main>
    </prototype-tab-content>
    `
  }
}

customElements.define('docs-content', DocsContent)