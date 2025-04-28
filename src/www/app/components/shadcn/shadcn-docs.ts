import { h } from '@/www/utils/dom';

export default class ShadcnDoc extends HTMLElement {
  connectedCallback() {
    this._setup();
  }

  private _setup() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('shadcn-button-doc'));
    fragment.appendChild(h('shadcn-card-doc'));
    fragment.appendChild(h('shadcn-tabs-doc'));
    fragment.appendChild(h('shadcn-select-doc'));
    fragment.appendChild(h('shadcn-input-doc'));
    fragment.appendChild(h('shadcn-scroll-area-doc'));
    fragment.appendChild(h('shadcn-switch-doc'));
    fragment.appendChild(h('shadcn-checkbox-doc'))
    
    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('shadcn-docs', ShadcnDoc);
