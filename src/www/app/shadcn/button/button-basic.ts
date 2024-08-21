import { Div, h } from '@/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';

export default class ButtonBasic extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'primary' }, ['Button'])]);
  };
}

customElements.define('button-basic', ButtonBasic);
