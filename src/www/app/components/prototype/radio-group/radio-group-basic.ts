import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import { ShadcnButton } from '@/components/shadcn';

export default class RadioGroupBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const button = h('shadcn-button', {}, ['Button']) as ShadcnButton;
    button.onClick = () => console.log('clicked');

    return Div({ class: 'flex flex-col items-center justify-center' }, [button]);
  };
}

customElements.define('radio-group-basic', RadioGroupBasic);
