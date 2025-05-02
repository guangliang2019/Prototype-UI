import { Div, h } from '@/www/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/components/shadcn';
import { HighlightRule } from '@/www/components/doc-component';

export default class ShadcnTooltipBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const tooltip = h('shadcn-tooltip-provider', { class: 'w-full flex',  }, [
      h('shadcn-tooltip', { class: 'w-full' }, [
        h('shadcn-tooltip-trigger', {  }, [
          h('shadcn-button', { variant: 'primary' }, ['Hover'])
          // h('p', {  }, [
          //   "Hover1",
          // ]),
        ]),
        h('shadcn-tooltip-content', {}, [
          h('div', { }, [
            "Add to library",
          ]),
        ]),
  
      ]),
      h('shadcn-tooltip', { class: 'w-full' }, [
        h('shadcn-tooltip-trigger', {  }, [
          h('p', {  }, [
            "Hover2",
          ]),
        ]),
        h('shadcn-tooltip-content', {}, ["22",
          h('div', { }, [
            "Add to library",
          ]),
          h('div', { }, [
            "Add to library",
          ]),
          "22"
        ]),
  



      ]),
    ]);
    return Div({ class: 'flex flex-col items-center justify-center w-[400px]' }, [tooltip]);
  };
}

customElements.define('shadcn-tooltip-basic', ShadcnTooltipBasic);
