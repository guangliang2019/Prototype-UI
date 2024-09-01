import PrototypeOverlay from '@/prototype/overlay/overlay';
import { ShadcnButton } from '@/shadcn';
import { Div, h } from '@/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import { HIGHLIGHT_RULE } from '@/utils/regex';

class OverlayTest extends DocCode {
  protected _code = `
<shadcn-button tabindex="0" class="select-none whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-md h-9 px-4 py-2 cursor-pointer text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-sm bg-secondary text-secondary-foreground  hover:bg-secondary/80" data-active="">
  Toggle Overlay
</shadcn-button>
<prototype-overlay style="position: relative; width: 0px; height: 0px;"></prototype-overlay>
`; // 我觉得这块没法写死，展示 overlay 后里面动态生成的 div 也应该在 _code 里被展示
   // 有没有什么办法直接从 DOM 拿到那块的 innerHTML 的？
  protected _highlightRules: HighlightRule[] = [
    HIGHLIGHT_RULE.htmlTagName,
    HIGHLIGHT_RULE.shadcnTagName,
    HIGHLIGHT_RULE.upperCamelCase,
    HIGHLIGHT_RULE.prototypeTagName,
  ];

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
      overlay2.getAttribute('data-open') === null ? overlay2.open() : overlay2.close();
    };

    return Div({}, [button, overlay2]);
  };
}

customElements.define('overlay-test', OverlayTest);
