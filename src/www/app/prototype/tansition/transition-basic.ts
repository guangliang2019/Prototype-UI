import { Div, h } from '@/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';
import { ShadcnButton } from '@/shadcn';
import PrototypeTransition from '@/prototype/transition/transition';

export default class TransitionBasic extends DocCode {
  protected _code = 'Code component is in development';

  protected _preview = () => {
    const toggleButton = h('shadcn-button', { class: 'mt-10' }, [
      'Toggle Transition',
    ]) as ShadcnButton;

    const transitionItem = h('prototype-transition', {
      class:
        'opacity-[0.95] size-[6.25rem] block rounded-xl bg-primary shadow-lg transition duration-[400ms] data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0 data-[leave]:duration-[200ms] data-[leave]:ease-in-out data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]',
    }) as PrototypeTransition;
    toggleButton.onClick = () => {
      transitionItem.show = !transitionItem.show;
    };

    const fragment = document.createDocumentFragment();
    fragment.appendChild(transitionItem);
    fragment.appendChild(toggleButton);

    return Div({ class: 'flex flex-col items-center justify-center' }, [fragment]);
  };
}

customElements.define('transition-basic', TransitionBasic);
