import { PrototypeAPI } from '@/core/interface';
import { ToggleContext } from './interface';

const asToggleContent = (p: PrototypeAPI) => {
    // 定义内容可见性状态
    const _visible = p.state.define(false, 'data-state');
    const _pressed = p.state.define(false, 'data-pressed');
    const _hover = p.state.define(false, 'data-hover');

    // 监听 ToggleContext 的变化
    p.context.watch(ToggleContext, (context, changedKeys) => {
        // pressed 状态变化时，更新本地状态和可见性
        if (changedKeys.includes('pressed')) {
            _pressed.set(context.pressed.value);
            updateVisibility();
        }


        if (changedKeys.includes('disabled')) {
            const element = p.view.getElement();
            context.disabled.value
                ? element.setAttribute('data-disabled', '')
                : element.removeAttribute('data-disabled');
        }
        if (changedKeys.includes('hover')) {
            _hover.set(!!context.hover);
            const element = p.view.getElement();
            element.setAttribute('data-hover', _hover.value ? 'true' : 'false');
        }
    });

    // 根据 pressed 状态更新可见性和 data-state 属性
    const updateVisibility = () => {
        // 只要 pressed 为 true，则内容可见
        const visible = _pressed.value;
        _visible.set(visible);

        // 更新 data-state 属性，便于样式和动画
        const element = p.view.getElement();
        const state = _pressed.value ? 'pressed' : 'unpressed';
        element.setAttribute('data-state', state);
    };

    // 组件挂载时初始化状态
    p.lifecycle.onMounted(() => {
        const context = p.context.get(ToggleContext);
        if (context) {
            _pressed.set(context.pressed.value);

            // 设置 disabled 属性
            const element = p.view.getElement();
            context.disabled.value
                ? element.setAttribute('data-disabled', '')
                : element.removeAttribute('data-disabled');

            updateVisibility();
        }
    });

    return {
        states: {
            visible: _visible,
            pressed: _pressed,
        }
    };
};

export default asToggleContent;