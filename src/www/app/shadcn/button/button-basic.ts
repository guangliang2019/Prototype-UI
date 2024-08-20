import { Div } from '../../../../utils/dom';
import { DocCode } from '../../../components/doc-component';

export default class ButtonBasic extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    return Div({}, ['Button Preview']);
  };
}

customElements.define('button-basic', ButtonBasic);
