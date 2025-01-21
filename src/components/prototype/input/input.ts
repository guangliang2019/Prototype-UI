import { ContextConsumer } from '@/components/common';
import { PrototypeFormItemContext } from '../form/interface';

export default class PrototypeInput extends ContextConsumer<PrototypeFormItemContext> {
  protected _consumerKeys = ['prototype-form-item' as const];

  protected _inputRef = document.createElement('input');

  connectedCallback() {
    super.connectedCallback();
    this._setup();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this._inputRef.setAttribute(name, newValue);
  }

  static get observedAttributes() {
    return [
      'placeholder',
      'type',
      'value',
      'disabled',
      'readonly',
      'name',
      'autofocus',
      'autocomplete',
    ];
  }

  private _setup = () => {
    if (this.contains(this._inputRef)) return;

    this.appendChild(this._inputRef);
  };
}

customElements.define('prototype-input', PrototypeInput);
