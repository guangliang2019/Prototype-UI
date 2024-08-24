import PrototypeOverlay from '@/prototype/overlay/overlay';
import { ShadcnButton } from '@/shadcn';
import { Div, h } from '@/utils/dom';
import { DocCode } from '@/www/components/doc-component';

class OverlayTest extends DocCode {
  protected _code = 'Code component is in development';
  protected _preview = () => {
    const button = h('shadcn-button', {}, ['Toggle Overlay']) as ShadcnButton;
    const overlay = h('prototype-overlay') as PrototypeOverlay;
    const content = h('div', {class: '-bottom-10'}, ['Overlay Content']);

    button.onClick = () => {
      overlay.getAttribute('data-show') === null ? overlay.show(content) : overlay.close();
    };

    return Div({}, [button, overlay]);
  };
}

customElements.define('overlay-test', OverlayTest);
