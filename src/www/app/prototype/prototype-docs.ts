import { h } from '@/utils/dom';
import './tansition';
import './select';
import './form'

export default class PrototypeDoc extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  private _render() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('button-doc'));
    fragment.appendChild(h('transition-doc'));
    fragment.appendChild(h('select-doc'));
    fragment.appendChild(h('form-doc'));

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('prototype-docs', PrototypeDoc);
