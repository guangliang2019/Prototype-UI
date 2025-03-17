import { Prototype } from '@/core/interface';
import { asTrigger } from '../trigger';
import { defineProps, useAttributeState, useConnect, useDisconnect } from '@/core/lifecycle';
import useEventListener from '@/core/hooks/use-event-listener';
import { SwitchProps } from './interface';

const asSwitch = (p: Prototype<SwitchProps>): void => {

    const _checked = useAttributeState<boolean>(p, 'checked', false);
    const _disabled = useAttributeState<boolean>(p, 'disabled', false);

    asTrigger(p)

    defineProps(
        p,
        {
            label: '',
            disabled: false,
            checked: false,
            onChange: () => { },
        },
        (key, value) => {
            switch (key) {
                case 'disabled':
                    _disabled.value = !!value;
                    if (value) p.componentRef.tabIndex = -1;
                    else p.componentRef.tabIndex = 0;
                    break;
                case 'checked':
                    _checked.value = !!value;
                    break;
                default:
                    break;
            }
        }
    );


    const _handleClick = (e: MouseEvent) => {
        const component = p.componentRef;
        if (_disabled.value) return;

        _checked.value = !_checked.value;

        component.dispatchEvent(
            new CustomEvent('change', {
                detail: { checked: _checked.value },
                bubbles: true
            })
        );

        component.onChange?.(new CustomEvent('change', {
            detail: { checked: _checked.value }
        }));
    };


    const _handleKeyDown = (e: KeyboardEvent) => {
        if (_disabled.value) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            _handleClick(e as unknown as MouseEvent);
        }
    };

    useEventListener(p, 'click', _handleClick as EventListener);
    useEventListener(p, 'keydown', _handleKeyDown as EventListener);
    useConnect(p, () => {
        p.componentRef.setAttribute('role', 'switch');
        p.componentRef.tabIndex = _disabled.value ? -1 : 0;
    });
    useDisconnect(p, () => {

    });
};



export const asSwitchThumb = (p: Prototype<SwitchProps>): void => {
    let observer: MutationObserver;

    const updateThumbState = () => {
        const component = p.componentRef;
        if (!component) return;

        const parentSwitch = component.closest('prototype-new-switch');
        if (!parentSwitch) return;

        const isChecked = parentSwitch.hasAttribute('checked');
        const isDisabled = parentSwitch.hasAttribute('disabled');

        
        component.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');
        component.setAttribute('data-disabled', isDisabled ? 'true' : 'false');

       
        if (parentSwitch instanceof HTMLElement) {
            parentSwitch.style.backgroundColor = isChecked ? '#4f46e5' : '#ccc';
        }
    };

    useConnect(p, () => {
        const component = p.componentRef;
        if (!component) return;

       
        const shadow = component.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                position: absolute;
                top: calc((var(--switch-height, 20px) - var(--switch-thumb-size, 16px)) / 2);
                left: calc((var(--switch-height, 20px) - var(--switch-thumb-size, 16px)) / 2);
                width: var(--switch-thumb-size, 16px);
                height: var(--switch-thumb-size, 16px);
                background-color: white;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                pointer-events: none;
                transform: translateX(0);
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1;
            }
            
            :host([data-state="checked"]) {
                transform: translateX(calc(var(--switch-width, 40px) - var(--switch-height, 20px)));
            }
            
            :host([data-disabled="true"]) {
                opacity: 0.5;
            }
        `;
        shadow.appendChild(style);

        
        updateThumbState();
        
        const parentSwitch = component.closest('prototype-new-switch');
        if (parentSwitch) {
            observer = new MutationObserver(updateThumbState);
            observer.observe(parentSwitch, { attributes: true, attributeFilter: ['checked', 'disabled'] });
        }
    });

    useDisconnect(p, () => {
        observer?.disconnect();
    });
};



export default asSwitch;
