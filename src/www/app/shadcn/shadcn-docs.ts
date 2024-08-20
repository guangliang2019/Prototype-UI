import { h } from '../../../utils/dom';

export default class ComponentsDoc extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  private _render() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('button-doc'));
    fragment.appendChild(h('tab-doc'));

    this.appendChild(fragment);
  }
}

customElements.define('shadcn-docs', ComponentsDoc);
