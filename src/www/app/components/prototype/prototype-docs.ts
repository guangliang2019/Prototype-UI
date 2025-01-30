// 该文件是 dev-cli 自动生成的，请勿手动修改
// 如需添加新的文档，请运行 npm run dev-cli 

import './transition';
import './select';
import './form';
import './scroll-area';
import './radio-group';
import './resizable';
import './button';
import { h } from '@/www/utils/dom';

export default class PrototypeDoc extends HTMLElement {
  connectedCallback() {
    this._setup();
  }

  private _setup() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('transition-doc'));
		fragment.appendChild(h('select-doc'));
		fragment.appendChild(h('form-doc'));
		fragment.appendChild(h('scroll-area-doc'));
		fragment.appendChild(h('radio-group-doc'));
		fragment.appendChild(h('resizable-doc'));
		fragment.appendChild(h('button-doc'));

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('prototype-docs', PrototypeDoc);
