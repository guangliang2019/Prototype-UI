import { ContextConsumer } from '@/common';
import { Div } from '@/www/utils/dom';
import { DocContext } from './interface';

class DocBreadcrumb extends ContextConsumer<{
  doc: DocContext;
}> {
  protected _consumerKeys = ['doc' as const];
  private svg: Document | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._setup();
  }

  private _setup() {
    if (this.svg === null) {
      const domParser = new DOMParser();
      this.svg = domParser.parseFromString(
        /* html */ `
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        `,
        'text/html'
      );
    }

    const svgElement = this.svg.documentElement.querySelector('svg');
    const fragment = document.createDocumentFragment();

    const routes = this._contextValues['doc'].doc.route;
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (i < routes.length - 1) {
        fragment.appendChild(Div({ class: 'truncate' }, [route]));
        fragment.appendChild(svgElement!);
      } else {
        fragment.appendChild(Div({ class: 'text-foreground' }, [route]));
      }
    }

    this.appendChild(
      Div(
        { class: 'mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground' },
        [fragment]
      )
    );
  }
}

customElements.define('doc-breadcrumb', DocBreadcrumb);
