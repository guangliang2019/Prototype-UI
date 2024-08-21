import { h } from '@/utils/dom';

export default class ComponentsDoc extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  private _render() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('button-doc'));
    fragment.appendChild(h('tab-doc'));

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('shadcn-docs', ComponentsDoc);
