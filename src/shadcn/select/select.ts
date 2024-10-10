import { PrototypeSelect } from '@/prototype/select';
import { ShadcnSelectContext } from './interface';

export default class ShadcnSelect extends PrototypeSelect<ShadcnSelectContext> {
  protected _providerKeys =(['shadcn-select', 'prototype-select']);
  private _class = '';
  private _computedClass = '';
  private _arrowRef = document.createElement('shadcn-select-arrow');
  private _checkRef = document.createElement('shadcn-select-check');
  private _valueRef = document.createElement('shadcn-select-value');

  connectedCallback() {
    super.connectedCallback();

    this._provideValues['shadcn-select'] = {
      arrowRef: this._arrowRef,
      checkRef: this._checkRef,
      valueRef: this._valueRef,

      updateRef: (name, ref) => {
        this[`_${name}`] = ref;
        this.setContext('shadcn-select', { [name]: ref });
      },
    };
    this._render();
  }

  private _render() {
    this._computedClass = 'block';
    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select', ShadcnSelect);
