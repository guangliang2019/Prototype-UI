import { Prototype } from '@/core/interface';
import { asTrigger } from '../trigger';
import { defineProps, useAttributeState, useConnect, useDisconnect } from '@/core/lifecycle';
import useEventListener from '@/core/hooks/use-event-listener';
import { SwitchProps } from './interface';
import { provideContext, watchContext } from '@/core/context';

// 创建上下文键
const SwitchStateContext = Symbol('SwitchState');

const asSwitch = (p: Prototype<SwitchProps>): void => {

    const _checked = useAttributeState<boolean>(p, 'checked', false);
    const _disabled = useAttributeState<boolean>(p, 'disabled', false);

    asTrigger(p)

    provideContext(p, SwitchStateContext, (updateContext) => {
        _checked.value = !!p.props?.checked;
        _disabled.value = !!p.props?.disabled;

        const originalCheckedSetter = Object.getOwnPropertyDescriptor(_checked, 'value')?.set;
        if (originalCheckedSetter) {
            Object.defineProperty(_checked, 'value', {
                set(v) {
                    originalCheckedSetter.call(_checked, v);
                    if (v) {
                        p.componentRef.setAttribute('checked', '');
                    } else {
                        p.componentRef.removeAttribute('checked');
                    }
                    // 状态变化时更新上下文
                    updateContext({ checked: _checked, disabled: _disabled });
                },
                get: () => Object.getOwnPropertyDescriptor(_checked, 'value')?.get?.call(_checked)
            });
        }

        return { checked: _checked, disabled: _disabled };
    });
    
    

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
    const updateThumbState = (state: { checked: { value: boolean }, disabled: { value: boolean } }) => {
        const component = p.componentRef;
        if (!component) return;

        // 更新数据属性
        component.setAttribute('data-state', state.checked.value ? 'checked' : 'unchecked');
        component.setAttribute('data-disabled', state.disabled.value ? 'true' : 'false');
    };

    useConnect(p, () => {
        
        p.watchContext(SwitchStateContext, updateThumbState);

   
        try {
            const state = p.useContext(SwitchStateContext);
            if (state) {
                updateThumbState(state);
            }
        } catch (e) {
            console.warn('无法获取Switch状态上下文', e);
        }
    });

    useDisconnect(p, () => {

    });
};



export default asSwitch;
