import { Div, h } from '@/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';

export default class ShadcnButtonGhost extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'ghost' }, ['Ghost'])]);
  };
}

customElements.define('shadcn-button-ghost', ShadcnButtonGhost);
