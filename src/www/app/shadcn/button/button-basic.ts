import { Div, h } from '../../../../utils/dom';
import { DocCode } from '../../../components/doc-component';
import '../../../../shadcn/index';

export default class ButtonBasic extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'primary' }, ['Button'])]);
  };
}

customElements.define('button-basic', ButtonBasic);
