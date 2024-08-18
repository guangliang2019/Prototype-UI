export default class TabDocs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <prototype-tab-content style="display: none" value="Tab">
      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"> 
        Tab 
      </main>
    </prototype-tab-content>
    `;
  }
}

customElements.define('tab-docs', TabDocs);
