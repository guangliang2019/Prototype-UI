import { SelectContext, SelectItemProps } from './interface';
import { PrototypeButton } from '../button';

export default class PrototypeSelectItem
  extends PrototypeButton<SelectContext>
  implements SelectItemProps
{
  protected _key = 'prototype-select';
  value: string = '';

  connectedCallback() {
    super.connectedCallback();
    this.value = this.getAttribute('value') || '';
    // this._contextValue.options.push(this.value);
    if (this._contextValue.defaultValue === this.value) this.setAttribute('data-selected', '');
    this.onClick = () => {
      this._contextValue.changeValue(this.value, true);
      this._contextValue.close();
    };

    this.onContextChange = (context) => {
      if (this.value === context.value) {
        this.setAttribute('data-selected', '');
      } else {
        this.removeAttribute('data-selected');
      }
    };
  }
}

customElements.define('prototype-select-item', PrototypeSelectItem);
