import PrototypeOverlay from '@/prototype/overlay/overlay';
import { ShadcnButton } from '@/shadcn';
import { Div, h } from '@/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

class OverlayTest extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const button = h('shadcn-button', {}, ['Toggle Overlay']) as ShadcnButton;
    const overlay = h('prototype-overlay', { style: 'top: 20px' }, [
      'Overlay Content',
    ]) as PrototypeOverlay<{}>;
    const content = h('div', { class: '-bottom-10' }, ['Overlay Content']);

    const overlay2 = new PrototypeOverlay();
    overlay2.setAttribute('style', 'top: 20px');
    overlay2.appendChild(content);

    button.onClick = () => {
      overlay2.getAttribute('data-oepn') === null ? overlay2.oepn() : overlay2.close();
    };

    return Div({}, [button, overlay2]);
  };
}

customElements.define('overlay-test', OverlayTest);
