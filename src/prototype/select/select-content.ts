import { PrototypeOverlay } from '../overlay';
import { SelectContext } from './interface';

export default class PrototypeSelectContent extends PrototypeOverlay<SelectContext> {
  protected _key = 'prototype-select';

  connectedCallback() {
    super.connectedCallback();
    this._contextValue.setContext({
      show: () => {
        this.show();
        this._contextValue.setContext({
          selecting: true,
        });
      },
      close: () => {
        this.close();
        this._contextValue.setContext({
          selecting: false,
        });
        // this._contextValue.focus();
      },
    });
  }
}

customElements.define('prototype-select-content', PrototypeSelectContent);
