import { PrototypeAPI } from '@/core/interface';
import { CheckboxProps, CheckboxState, CheckedContextType, CheckboxContext, CHECKBOX_DEFAULT_PROPS, CheckboxExposes } from './interface';
import { asButton } from '../as-button';

const asCheckbox = <
    Props extends CheckboxProps = CheckboxProps,
    Exposes extends CheckboxExposes = CheckboxExposes,
>(
    p: PrototypeAPI<Props, Exposes>
): {
    states: CheckboxState;
} => {
    // 继承按钮行为
    asButton(p);

    // 状态定义
    const _checked = p.state.define(false, 'data-checked');
    const _disabled = p.state.define(false);
    const _indeterminate = p.state.define(false, 'data-indeterminate');
    const _id = p.state.define('', 'id');
    const _required = p.state.define(false, 'aria-required');

    // 上下文
    let _updateContext: (value: Partial<CheckedContextType>) => void = (value) => {
        // 初始化前的空操作
    };

    p.context.provide(CheckboxContext, (updateContext) => {
        const props = p.props.get();
        _updateContext = updateContext;
        _checked.set(props.checked ?? false);
        _disabled.set(props.disabled ?? false);
        _indeterminate.set(props.indeterminate ?? false);
        _id.set(props.id ?? '');
        _required.set(props.required ?? false);

        return {
            checked: _checked,
            disabled: _disabled,
            indeterminate: _indeterminate,
            id: _id,
            required: _required
        };
    });

    // 属性定义和监听
    p.props.define(CHECKBOX_DEFAULT_PROPS as Props);
    p.props.watch(['checked'], ({ checked }) => {
        _checked.set(checked ?? false);
        _updateContext?.({ checked: _checked });
    });
    p.props.watch(['disabled'], ({ disabled }) => {
        _disabled.set(disabled ?? false);
        _updateContext?.({ disabled: _disabled });
    });
    p.props.watch(['indeterminate'], ({ indeterminate }) => {
        _indeterminate.set(indeterminate ?? false);
        _updateContext?.({ indeterminate: _indeterminate });
    });
    p.props.watch(['id'], ({ id }) => {
        _id.set(id ?? '');
        _updateContext?.({ id: _id });
    });
    p.props.watch(['required'], ({ required }) => {
        _required.set(required ?? false);
        _updateContext?.({ required: _required });
    });

    // 事件处理
    const _handleClick = (e: MouseEvent) => {
        const { onCheckedChange } = p.props.get();
        if (_disabled.value) return;

        _checked.set(!_checked.value);
        if (_indeterminate.value) {
            _indeterminate.set(false);
        }
        _updateContext?.({
            checked: _checked,
            indeterminate: _indeterminate
        });

        onCheckedChange?.(_checked.value);
    };

    const _handleKeyDown = (e: KeyboardEvent) => {
        if (_disabled.value) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            _handleClick(e as unknown as MouseEvent);
        }
    };

    p.event.on('click', _handleClick);
    p.event.on('keydown', _handleKeyDown);

    // 生命周期
    p.lifecycle.onMounted(() => {
        p.event.focus.setPriority(_disabled.value ? -1 : 0);
        const props = p.props.get();
        if (props.defaultChecked) {
            _checked.set(true);
            _updateContext?.({ checked: _checked });
        }
    });

    return {
        states: {
            checked: _checked,
            indeterminate: _indeterminate,
            disabled: _disabled
        }
    };
}

export default asCheckbox;