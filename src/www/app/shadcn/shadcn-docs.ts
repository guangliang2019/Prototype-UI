import { h } from '@/utils/dom';

export default class ShadcnDoc extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  private _render() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('shadcn-button-doc'));
    fragment.appendChild(h('shadcn-tab-doc'));

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('shadcn-docs', ShadcnDoc);
