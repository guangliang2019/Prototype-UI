export default class ButtonDocs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <prototype-tab-content style="display: none" value="Button">
      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"> 
        <div class="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div class="truncate">Docs</div>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <div class="text-foreground">Button</div>
        </div>
        <div class="space-y-2">
          <h1 class="scroll-m-20 text-3xl font-bold tracking-tight">Button</h1>
          <p class="text-base text-muted-foreground">
            <span data-br=":rl:" data-brr="1" style="display: inline-block; vertical-align: top; text-decoration: inherit; max-width: 453px;">Displays a button or a component that looks like a button.</span>
          </p>
        <div>
        <div class="pb-12 pt-8">
        <prototype-tab default-value="preivew">
        
        </prototype-tab>
        </div>
      </main>
    </prototype-tab-content>
    `;
  }
}

customElements.define('button-docs', ButtonDocs);
