import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/shadcn';
import { ShadcnButton } from '@/shadcn';
import PrototypeTransition from '@/prototype/transition/transition';
import { HIGHLIGHT_RULE } from '@/www/utils/regex';

export default class MotionScrollTest extends DocCode {
  protected _code = '';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const toggleButton = h(
      'motion-scroll',
      { class: 'bg-indigo-500 h-20 w-20 overflow-y-scroll' },
      [
        h('div', {}, [
          h('div', { class: 'h-20 w-full bg-indigo-400' }, ['1']),
          h('div', { class: 'h-20 w-full bg-indigo-400' }, ['2']),
          h('div', { class: 'h-20 w-full bg-indigo-400' }, ['3']),
          h('div', { class: 'h-20 w-full bg-indigo-400' }, ['4']),
          h('div', { class: 'h-20 w-full bg-indigo-400' }, ['5']),
        ]),
      ]
    ) as ShadcnButton;

    const fragment = document.createDocumentFragment();

    fragment.appendChild(toggleButton);

    return Div({ class: 'flex flex-col items-center justify-center' }, [fragment]);
  };
}

customElements.define('motion-scroll-test', MotionScrollTest);
