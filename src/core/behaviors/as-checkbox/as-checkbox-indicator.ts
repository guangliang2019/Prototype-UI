import { PrototypeAPI } from '@/core/interface';
import { CheckboxContext } from './interface';

const asCheckboxIndicator = (p: PrototypeAPI) => {
    // 定义组件状态
    const _checked = p.state.define(false, 'data-checked');
    const _indeterminate = p.state.define(false, 'data-indeterminate');
    const _visible = p.state.define(false, 'data-state');

    // 监听父组件的上下文变化
    p.context.watch(CheckboxContext, (context, changedKeys) => {
        // 当checked状态变化时更新indicator
        if (changedKeys.includes('checked')) {
            _checked.set(context.checked.value);
            updateVisibility();
        }

        // 当indeterminate状态变化时更新indicator
        if (changedKeys.includes('indeterminate')) {
            _indeterminate.set(context.indeterminate.value);
            updateVisibility();
        }

        // 当disabled状态变化时更新属性
        if (changedKeys.includes('disabled')) {
            const element = p.view.getElement();
            context.disabled.value
                ? element.setAttribute('data-disabled', '')
                : element.removeAttribute('data-disabled');
        }
    });

    // 根据checked和indeterminate状态更新可见性
    const updateVisibility = () => {
        _visible.set(_checked.value || _indeterminate.value);

        // 更新数据属性以支持样式和动画
        const element = p.view.getElement();
        const state = _indeterminate.value
            ? 'indeterminate'
            : _checked.value
                ? 'checked'
                : 'unchecked';

        element.setAttribute('data-state', state);
    };

    // 组件挂载时初始化状态
    p.lifecycle.onMounted(() => {
        const context = p.context.get(CheckboxContext);
        if (context) {
            // 初始化状态
            _checked.set(context.checked.value);
            _indeterminate.set(context.indeterminate.value);

            // 设置disabled属性
            const element = p.view.getElement();
            context.disabled.value
                ? element.setAttribute('data-disabled', '')
                : element.removeAttribute('data-disabled');

            // 初始化可见性
            updateVisibility();
        }
    });

    return {
        states: {
            checked: _checked,
            indeterminate: _indeterminate,
            visible: _visible
        }
    };
};

export default asCheckboxIndicator;