import { Div, h } from '@/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';

export default class ButtonDestructive extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'destructive' }, ['Destructive'])]);
  };
}

customElements.define('button-destructive', ButtonDestructive);
