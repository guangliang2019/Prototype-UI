import { PrototypeSelect } from '@/prototype/select';

export default class ShadcnSelect extends PrototypeSelect {
  private _class = '';
  private _computedClass = '';

  connectedCallback() {
    super.connectedCallback();
    this._render();
  }

  private _render() {
    this._computedClass = 'block';
    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select', ShadcnSelect);
