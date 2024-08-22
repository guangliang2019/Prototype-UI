import { PrototypeTabTrigger } from '@/utils/dom';

class WebsiteAsideItem extends HTMLElement {
  private _title = '';
  private _value = '';
  connectedCallback() {
    this._value = this.getAttribute('value') || '';
    this._title = this.getAttribute('title') || '';
    this._render();
  }

  private _render() {
    this.appendChild(
      PrototypeTabTrigger(
        {
          class:
            'cursor-pointer group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground data-[selected]:text-foreground',
          value: this._value,
        },
        [this._title]
      )
    );
  }
}

customElements.define('website-aside-item', WebsiteAsideItem);
