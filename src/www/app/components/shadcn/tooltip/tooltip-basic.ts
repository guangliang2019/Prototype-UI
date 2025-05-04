import { Div, h } from '@/www/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/components/shadcn';
import { HighlightRule } from '@/www/components/doc-component';

export default class ShadcnTooltipBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const tooltip = h('shadcn-tooltip-provider', { class: '',  }, [
      h('shadcn-tooltip', { class: '' }, [
  
        h('shadcn-tooltip-trigger', {  }, [
          h('shadcn-button', { variant: 'primary' }, ['Hover'])
        ]),    
        h('shadcn-tooltip-content', { class:'w-full'}, [
          h('p', { }, [
            "Add to library",
          ]),
          h('div', { }, [
            "Addtolibrary",
          ]),
        ]),

  
      ]),
 
    ]);
    return Div({ class: 'flex flex-col items-center justify-center w-[400px]' }, [tooltip]);
  };
}

customElements.define('shadcn-tooltip-basic', ShadcnTooltipBasic);
