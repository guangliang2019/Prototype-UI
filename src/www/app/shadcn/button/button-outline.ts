import { Div, h } from '@/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';

export default class ButtonOutline extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'outline' }, ['Outline'])]);
  };
}

customElements.define('button-outline', ButtonOutline);
