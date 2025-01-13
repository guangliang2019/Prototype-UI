import { PrototypeTabsTrigger } from '@/www/utils/dom';
import { Router } from '@/www/router';

class WebsiteAsideItem extends HTMLElement {
  private _title = '';
  private _value = '';
  private _href = '';
  connectedCallback() {
    this._value = this.getAttribute('value') || '';
    this._title = this.getAttribute('title') || '';
    this._href = this.getAttribute('href') || '';
    this._setup();
    this.onclick = () => {
      // Router.getInstance().push(this._href);
    };
  }

  private _setup() {
    this.appendChild(
      PrototypeTabsTrigger(
        {
          class:
            'cursor-pointer group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground data-[state=active]:text-foreground',
          value: this._value,
        },
        [this._title]
      )
    );
  }
}

customElements.define('website-aside-item', WebsiteAsideItem);
