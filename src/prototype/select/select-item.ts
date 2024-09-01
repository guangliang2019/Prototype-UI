import { SelectContext, SelectItemProps } from './interface';
import { PrototypeButton } from '../button';

export default class PrototypeSelectItem
  extends PrototypeButton<SelectContext>
  implements SelectItemProps
{
  protected _key = 'prototype-select';
  value: string = '';

  private _handleSelectItemMouseEnter = () => {
    this.focus();
  };
  private _handleSelectItemMouseLeave = () => {
    this.blur();
  };

  connectedCallback() {
    super.connectedCallback();
    this.value = this.getAttribute('value') || '';
    if (this._contextValue.defaultValue === this.value) this.setAttribute('data-selected', '');

    this.addEventListener('mouseenter', this._handleSelectItemMouseEnter);
    this.addEventListener('mouseleave', this._handleSelectItemMouseLeave);

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

  disconnectedCallback() {
    this.removeEventListener('mouseenter', this._handleSelectItemMouseEnter);
    this.removeEventListener('mouseleave', this._handleSelectItemMouseLeave);
    super.disconnectedCallback();
  }
}

customElements.define('prototype-select-item', PrototypeSelectItem);
