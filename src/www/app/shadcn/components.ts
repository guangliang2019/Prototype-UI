import { h } from '../../../utils/dom';

export default class ComponentsDocs extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  private _render() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('button-docs'));
    fragment.appendChild(h('tab-docs'));
    fragment.appendChild(h('transition-docs'));

    this.appendChild(fragment);
  }
}

customElements.define('components-docs', ComponentsDocs);
