export default class ComponentsDocs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <button-docs></button-docs>
    <tab-docs></tab-docs>
    <transition-docs></transition-docs>
    `;
  }
}

customElements.define('components-docs', ComponentsDocs);
