import { ContextConsumer } from '@/common';
import { SelectContext, SelectValueProps } from './interface';

export default class PrototypeSelectValue
  extends ContextConsumer<SelectContext>
  implements SelectValueProps
{
  protected _key = 'prototype-select';

  protected _content: HTMLElement = document.createElement('span');

  renderValue: (value: string) => HTMLElement = (value) => {
    const span = document.createElement('span');
    span.textContent = value;
    return span;
  };

  connectedCallback() {
    super.connectedCallback();
    this._render();
    this.onContextChange = () => {
      this._render();
    };
  }

  protected _render() {
    if (this.firstChild) this.removeChild(this._content);
    this._content = this.renderValue(this._contextValue.value);
    this.appendChild(this._content);
  }
}

customElements.define('prototype-select-value', PrototypeSelectValue);
