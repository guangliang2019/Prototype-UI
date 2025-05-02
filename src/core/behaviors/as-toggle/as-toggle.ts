import { PrototypeAPI } from '@/core/interface';
import { ToggleProps, ToggleState, ToggleContextType, ToggleContext, TOGGLE_DEFAULT_PROPS, ToggleExposes } from './interface';
import { asButton } from '../as-button';

const asToggle = <
    Props extends ToggleProps = ToggleProps,
    Exposes extends ToggleExposes = ToggleExposes,
>(
    p: PrototypeAPI<Props, Exposes>
): {
    states: ToggleState;
} => {
    // 继承按钮行为
    asButton(p);

    // 状态定义
    const _pressed = p.state.define(false, 'pressed');
    const _disabled = p.state.define(false);
    const _value = p.state.define<string | undefined>(undefined);
    const _name = p.state.define<string | undefined>(undefined);
    const _required = p.state.define(false, 'aria-required');

    // 上下文
    let _updateContext: (value: Partial<ToggleContextType>) => void = () => {};

    p.context.provide(ToggleContext, (updateContext) => {
        const props = p.props.get();
        _updateContext = updateContext;
        _pressed.set(props.pressed ?? false);
        _disabled.set(props.disabled ?? false);
        _value.set(props.value);
        _name.set(props.name);
        _required.set(props.required ?? false);

        return {
            pressed: _pressed,
            disabled: _disabled,
            value: _value,
            name: _name,
            required: _required,
            updateRef: (key: string, el: HTMLElement) => {},
            toggleRef: undefined,
        };
    });

    // 属性定义和监听
    p.props.define(TOGGLE_DEFAULT_PROPS as Props);
    p.props.watch(['pressed'], ({ pressed }) => {
        _pressed.set(pressed ?? false);
        _updateContext?.({ pressed: _pressed});
    });
    p.props.watch(['disabled'], ({ disabled }) => {
        _disabled.set(disabled ?? false);
        _updateContext?.({ disabled: _disabled });
    });
    p.props.watch(['value'], ({ value }) => {
        _value.set(value);
        _updateContext?.({ value: _value });
    });
    p.props.watch(['name'], ({ name }) => {
        _name.set(name);
        _updateContext?.({ name: _name });
    });
    p.props.watch(['required'], ({ required }) => {
        _required.set(required ?? false);
        _updateContext?.({ required: _required });
    });

    // 事件处理
    const _handleClick = (e: MouseEvent) => {
        const { onPressedChange } = p.props.get();
        if (_disabled.value) return;

        const next = !_pressed.value;
        _pressed.set(next);
        _updateContext?.({ pressed: _pressed });
        onPressedChange?.(next);
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
        if (props.defaultPressed) {
            _pressed.set(true);
            _updateContext?.({ pressed: _pressed });
        }
        const element = p.view.getElement();
        element.addEventListener('mouseenter', () => {
            element.setAttribute('data-hover', 'true');
            
            _updateContext?.({ hover: true });
        });
        element.addEventListener('mouseleave', () => {
            element.setAttribute('data-hover', 'false');
            _updateContext?.({ hover: false });
        });
    });

    return {
        states: {
            pressed: _pressed,
            disabled: _disabled,
            value: _value,
            name: _name,
            required: _required,
        } as ToggleState,
    };
};

export default asToggle;