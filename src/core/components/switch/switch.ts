import { Prototype } from '@/core/interface';
import { asTrigger } from '../trigger';
import { defineProps, useAttributeState, useConnect, useDisconnect } from '@/core/lifecycle';
import useEventListener, { useFocus, useHover } from '@/core/hooks/use-event-listener';
import { SwitchProps } from './interface';

const asSwitch = (p: Prototype<SwitchProps>): void => {
    // role
    asTrigger(p);

    // state
    const _checked = useAttributeState<boolean>(p, 'checked', false);

    // props
    defineProps(
        p,
        {
            disabled: false,
            autoFocus: false,
            onClick: () => { },
        },
        (key, value) => {
            const component = p.componentRef;
            switch (key) {
                case 'disabled':
                    if (value) component.tabIndex = -1;
                    else component.tabIndex = 0;
                    break;
                default:
                    break;
            }
        }
    );

    // ui-state
    const _hover = useAttributeState<boolean>(p, 'hover', false);
    const _focus = useAttributeState<boolean>(p, 'focus', false);
    const _focusVisible = useAttributeState<boolean>(p, 'focus-visible', false);
    const _active = useAttributeState<boolean>(p, 'active', false);

    useHover(p, (value) => (_hover.value = value));
    useFocus(p, (value) => {
        if (value) {
            if (_active.value) _focusVisible.value = true;
            _focus.value = true;
        } else {
            _focusVisible.value = false;
            _focus.value = false;
        }
    });

    useEventListener(p, 'mousedown', () => (_active.value = true));
    useEventListener(p, 'mouseup', () => (_active.value = false));

    // event
    const _handleClick = (e: MouseEvent) => {
        const component = p.componentRef;
        if (!_focus.value) return;
        if (component.disabled) return;

        // 切换checked状态
        _checked.value = !_checked.value;

        component.onClick?.(e);
    };

    const _handleKeyDown = (e: KeyboardEvent) => {
        const component = p.componentRef;
        if (!_focus.value) return;
        if (component.disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
            // 切换checked状态
            _checked.value = !_checked.value;
            component.onClick?.(e);
        }
    };

    useEventListener(p, 'click', _handleClick as EventListener);
    useEventListener(p, 'keydown', _handleKeyDown as EventListener);

    // auto focus
    useConnect(p, () => {
        const component = p.componentRef;
        if (component.autoFocus) component.focus();
    });

    // 添加UI渲染逻辑，创建DOM结构和样式
    const render = () => {
        const component = p.componentRef;

        // 添加CSS变量支持的样式
        if (!component.shadowRoot) {
            const shadow = component.attachShadow({ mode: 'open' });

            // 创建样式元素
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    --switch-width: 40px;
                    --switch-height: 20px;
                    --switch-thumb-size: 16px;
                    --switch-color: #3b82f6;
                    --switch-bg-color: #e2e8f0;
                    --switch-thumb-color: white;
                    
                    display: inline-block;
                    width: var(--switch-width);
                    height: var(--switch-height);
                    position: relative;
                    cursor: pointer;
                    vertical-align: middle;
                }
                
                :host([disabled]) {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .track {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--switch-bg-color);
                    border-radius: calc(var(--switch-height) / 2);
                    transition: background-color 0.2s;
                }
                
                :host([checked]) .track {
                    background-color: var(--switch-color);
                }
                
                .thumb {
                    position: absolute;
                    top: calc((var(--switch-height) - var(--switch-thumb-size)) / 2);
                    left: calc((var(--switch-height) - var(--switch-thumb-size)) / 2);
                    width: var(--switch-thumb-size);
                    height: var(--switch-thumb-size);
                    background-color: var(--switch-thumb-color);
                    border-radius: 50%;
                    transition: transform 0.2s;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                }
                
                :host([checked]) .thumb {
                    transform: translateX(calc(var(--switch-width) - var(--switch-height)));
                }
                
                :host(:focus-visible) {
                    outline: 2px solid var(--switch-color);
                    outline-offset: 2px;
                }
            `;

            // 创建开关轨道和滑块
            const track = document.createElement('div');
            track.className = 'track';

            const thumb = document.createElement('div');
            thumb.className = 'thumb';

            shadow.appendChild(style);
            shadow.appendChild(track);
            shadow.appendChild(thumb);
        }

        // 监听checked属性变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'checked') {
                    const isChecked = component.hasAttribute('checked');
                    // 触发change事件
                    component.dispatchEvent(
                        new CustomEvent('change', {
                            detail: { checked: isChecked },
                            bubbles: true
                        })
                    );
                }
            });
        });

        // 开始观察
        observer.observe(component, { attributes: true });

        // 组件断开连接时停止观察
        p.disconnectedCallbacks.add(() => {
            observer.disconnect();
        });

        return null;
    };

    // 设置渲染函数
    p.render = render;
};



export const asSwitchThumb = (p: Prototype<SwitchProps>): void => {
    // 获取父级开关的上下文
    const _switchContext = p.componentRef.closest('prototype-new-switch');

    // 创建thumb元素
    const render = () => {
        const component = p.componentRef;

        // 如果组件没有shadow DOM，创建一个
        if (!component.shadowRoot) {
            const shadow = component.attachShadow({ mode: 'open' });

            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    position: absolute;
                    top: calc((var(--switch-height, 20px) - var(--switch-thumb-size, 16px)) / 2);
                    left: calc((var(--switch-height, 20px) - var(--switch-thumb-size, 16px)) / 2);
                    width: var(--switch-thumb-size, 16px);
                    height: var(--switch-thumb-size, 16px);
                    background-color: var(--switch-thumb-color, white);
                    border-radius: 50%;
                    transition: transform 0.2s;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                    pointer-events: none;
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
        }

        // 根据父开关状态设置数据属性
        if (_switchContext) {
            const isChecked = _switchContext.hasAttribute('checked');
            const isDisabled = _switchContext.hasAttribute('disabled');

            component.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');
            component.setAttribute('data-disabled', isDisabled ? 'true' : 'false');

            // 监听父开关的状态变化
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'checked') {
                        const newChecked = _switchContext.hasAttribute('checked');
                        component.setAttribute('data-state', newChecked ? 'checked' : 'unchecked');
                    } else if (mutation.attributeName === 'disabled') {
                        const newDisabled = _switchContext.hasAttribute('disabled');
                        component.setAttribute('data-disabled', newDisabled ? 'true' : 'false');
                    }
                });
            });

            observer.observe(_switchContext, { attributes: true });

            // 组件断开连接时停止观察
            p.disconnectedCallbacks.add(() => {
                observer.disconnect();
            });
        }

        return null;
    };

    // 连接时初始化元素
    useConnect(p, () => {
        render();
    });
};



export default asSwitch;
