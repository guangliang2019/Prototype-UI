import { h } from '@/www/utils/dom';
import './transition';
import './select';
import './form';
import './scroll-area';
import './radio-group';
import './resizable';

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
    fragment.appendChild(h('radio-group-doc'));
    fragment.appendChild(h('resizable-doc'));

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('prototype-docs', PrototypeDoc);
