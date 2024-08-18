export default class TransitionDocs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <prototype-tab-content style="display: none" value="Transition">
      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"> 
        Transition 
      </main>
    </prototype-tab-content>
    `;
  }
}

customElements.define('transition-docs', TransitionDocs);
