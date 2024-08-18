class WebsiteAsideItem extends HTMLElement {
  private _value = ''
  connectedCallback() {
    this._value = this.getAttribute('value') || ''

    this.innerHTML = 
    /* html */`
    <prototype-tab-trigger value="${this._value}" class="cursor-pointer group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground data-[selected]:text-foreground">
      ${this._value}
    </prototype-tab-trigger>
    `
  }
}

customElements.define('website-aside-item', WebsiteAsideItem)