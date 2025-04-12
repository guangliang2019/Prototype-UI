import '@/components/prototype/tabs';
import './github-button';
import { Div, h, Nav, PrototypeTabsTrigger, Span } from '@/www/utils/dom';

export default class WebsiteNav extends HTMLElement {
  private _navItemsCls =
    'cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60 data-[selected]:text-foreground';

  connectedCallback() {
    this._setup();
  }

  private _setup() {
    this.appendChild(
      h(
        'header',
        {
          class:
            'flex justify-center sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        },
        [
          Div({ class: 'container flex h-14 items-center' }, [
            Span({ class: 'font-bold mr-6' }, ['Prototype UI']),
            Nav({ class: 'relative flex items-center gap-4 text-sm lg:gap-6' }, [
              PrototypeTabsTrigger({ value: 'docs', class: this._navItemsCls }, ['Docs']),
              PrototypeTabsTrigger({ value: 'components', class: this._navItemsCls }, [
                'Components',
              ]),
              PrototypeTabsTrigger({ value: 'design-systems', class: this._navItemsCls }, [
                'Design Systems',
              ]),
              PrototypeTabsTrigger({ value: 'examples', class: this._navItemsCls }, ['Examples']),
            ]),
            Div({ class: 'flex flex-1 items-center justify-between space-x-2 md:justify-end' }, [
              h('github-button'),
            ]),
          ]),
        ]
      )
    );
  }
}

customElements.define('website-nav', WebsiteNav);
