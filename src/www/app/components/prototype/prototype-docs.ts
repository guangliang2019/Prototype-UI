import { h } from '@/www/utils/dom';
import './transition';
import './select';
import './form';
import './scroll-area';

export default class PrototypeDoc extends HTMLElement {
  connectedCallback() {
    this._setup();
  }

  private _setup() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('button-doc'));
    fragment.appendChild(h('transition-doc'));
    fragment.appendChild(h('select-doc'));
    fragment.appendChild(h('form-doc'));
    fragment.appendChild(h('scroll-area-doc'));

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('prototype-docs', PrototypeDoc);
