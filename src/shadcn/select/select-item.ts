import { PrototypeSelectItem } from '@/prototype/select';

export default class ShadcnSelectItem extends PrototypeSelectItem {
  private _class = '';
  private _computedClass = '';

  connectedCallback() {
    super.connectedCallback();
    this._render();
  }

  private _render() {
    this._computedClass =
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select-item', ShadcnSelectItem);
