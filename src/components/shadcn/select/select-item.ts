import { PrototypeSelectItem } from '@/components/prototype/select';
import { ShadcnSelectContext } from './interface';
import { PrototypeSelectContext } from '@/components/prototype/select/interface';

export default class ShadcnSelectItem extends PrototypeSelectItem<ShadcnSelectContext> {
  protected _consumerKeys = ['shadcn-select', 'prototype-select'];

  private _class = '';
  private _computedClass = '';
  private _checkRef = document.createElement('shadcn-select-check');

  private _handlePrototypeSelectValueChange = (
    context: PrototypeSelectContext['prototype-select'],
    keys: string[]
  ) => {
    if (keys.includes('value')) {
      if (this.value === context.value) {
        this._checkRef.setAttribute('data-selected', '');
      } else {
        this._checkRef.removeAttribute('data-selected');
      }
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._setup();
    this._handlePrototypeSelectValueChange(this._contextValues['prototype-select'], ['value']);
    this.addContextListener('prototype-select', this._handlePrototypeSelectValueChange);
  }

  disconnectedCallback() {
    this.removeContextListener('prototype-select', this._handlePrototypeSelectValueChange);
    super.disconnectedCallback();
  }

  private _setup() {
    this._computedClass =
      'relative flex justify-between w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';
    if (!this.contains(this._checkRef)) this.appendChild(this._checkRef);

    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select-item', ShadcnSelectItem);
