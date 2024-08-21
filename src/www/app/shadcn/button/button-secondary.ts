import { Div, h } from '@/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';

export default class ButtonSecondary extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    return Div({}, [h('shadcn-button', {}, ['Secondary'])]);
  };
}

customElements.define('button-secondary', ButtonSecondary);
