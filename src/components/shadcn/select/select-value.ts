import { PrototypeSelectValue } from '@/components/prototype/select';
import { ShadcnSelectContext } from './interface';

export default class ShadcnSelectValue extends PrototypeSelectValue<ShadcnSelectContext> {
  protected _consumerKeys = ['shadcn-select', 'prototype-select'];

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['shadcn-select'].valueRef = this;
    if (this.children.length > 0 || this.textContent !== '') {
      this._contextValues['shadcn-select'].updateRef('valueRef', this);
      return;
    }
  }

  renderValue: (value: string) => HTMLElement = (value: string) => {
    const span = document.createElement('span');
    span.textContent = value;
    return span;
  };
}

customElements.define('shadcn-select-value', ShadcnSelectValue);
