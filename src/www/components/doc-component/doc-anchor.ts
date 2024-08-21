import { A, Div, Li, P, Ul } from '@/utils/dom';

class DocAnchor extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  private _render() {
    const anchorCls =
      'inline-block no-underline transition-colors hover:text-foreground text-muted-foreground';

    this.appendChild(
      Div({ class: 'hidden text-sm xl:block w-[300px]' }, [
        Div({ class: 'fixed top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12' }, [
          Div({ class: 'space-y-2' }, [
            P({ class: 'font-medium' }, ['On This Page']),
            Ul({ class: 'm-0 list-none' }, [
              Li({ class: 'mt-0 pt-2' }, [A({ href: '#faq', class: anchorCls }, ['FAQ'])]),
            ]),
          ]),
        ]),
      ])
    );
  }
}

customElements.define('doc-anchor', DocAnchor);
