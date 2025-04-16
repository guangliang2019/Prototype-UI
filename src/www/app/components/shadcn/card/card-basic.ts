import { DocCode, HighlightRule } from "@/www/components/doc-component";
import '@/components/shadcn';
import { Div,h } from "@/www/utils/dom";

export default class ShadcnCardBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] =[];

  protected _preview = () => {
    const card = h('shadcn-card',{ class: 'w-[350px]' },[
      h('shadcn-card-header',{  },[
          h('shadcn-card-title', { class: ' ' }, [
            h('h1', { class: ' ' }, [
              "Create project",
            ]),
          ]),

          h('shadcn-card-description', { class: ' ' }, [
              h('p', { class: 'text-sm text-muted-foreground' }, [
                "Deploy your new project in one-click",
              ]),
          ]),

      ]),
      h('shadcn-card-content',{  },[
        h('form', { },[
          h('div',{ class: 'grid w-full items-center gap-4' },[
            h('div', { class: 'flex flex-col space-y-1.5' }, [
              h('label', { class: '' }, [
                "Name",
              ]),
              h('shadcn-input', { 'placeholder': 'Name of your project' }),
            ]),

            h('div', { class: 'flex flex-col space-y-1.5' }, [

              h('h1', { class: '' }, [
                "Framework",
              ]),

              h('shadcn-select', { 'default-value': 'Option 2' }, [
                h('shadcn-select-trigger', { class: 'w-full' }),
                h(
                  'shadcn-select-content',
                  {
                    class: 'flex flex-col items-center justify-center',
                  },
                  [
                    h('shadcn-select-item', { value: 'Option 1' }, ['Option 1']),
                    h('shadcn-select-item', { value: 'Option 2' }, ['Option 2']),
                    h('shadcn-select-item', { value: 'Option 3' }, ['Option 3']),
                  ]
                ),
              ]),
              
            ]),

          ]),
        ]),




      ]),

      h( 'shadcn-card-footer',{  },[
        h('shadcn-button', { variant: 'outline' }, ['Cancle']),
        h('shadcn-button', { variant: 'primary' }, ['Deploy'])
      ]),
    ]);
 return Div({ class: 'preview flex min-h-[350px] w-full justify-center p-10 items-center ' }, [card]);
  };
}

customElements.define('shadcn-card-basic',ShadcnCardBasic);