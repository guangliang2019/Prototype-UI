// 该文件是 dev-cli 自动生成的，请勿手动修改
// 如需添加新的文档，请运行 npm run dev-cli

import './transition';
import './select';
import './form';
import './scroll-area';
import './radio-group';
import './resizable';
import './button';
import './test-tab';
import './test-button';
import './new-switch';
import './checkbox';
import './toggle';
import './slider';

import { h } from '@/www/utils/dom';

export default class PrototypeDoc extends HTMLElement {
  connectedCallback() {
    this._setup();
  }

  private _setup() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(h('transition-doc'));
    fragment.appendChild(h('select-doc'));
    // fragment.appendChild(h('form-doc'));
    fragment.appendChild(h('scroll-area-doc'));
    fragment.appendChild(h('radio-group-doc'));
    fragment.appendChild(h('resizable-doc'));
    fragment.appendChild(h('button-doc'));
    fragment.appendChild(h('test-tab-doc'));
    fragment.appendChild(h('test-button-doc'));
    fragment.appendChild(h('test-vue-button-doc'));
    fragment.appendChild(h('new-switch-doc'));
    fragment.appendChild(h('checkbox-doc'));
    fragment.appendChild(h('toggle-doc'));
    fragment.appendChild(h('slider-doc'));

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('prototype-docs', PrototypeDoc);
