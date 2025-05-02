import { PrototypeAPI } from '@/core/interface';
import {
  ToggleProps,
  ToggleState,
  ToggleContextType,
  ToggleContext,
  TOGGLE_DEFAULT_PROPS,
  ToggleExposes,
} from './interface';
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

  // 上下文
  let _updateContext: (value: Partial<ToggleContextType>) => void = () => {};

  p.context.provide(ToggleContext, (updateContext) => {
    const props = p.props.get();
    _updateContext = updateContext;
    _pressed.set(props.pressed ?? false);
    _disabled.set(props.disabled ?? false);

    return {
      pressed: _pressed,
      disabled: _disabled,
      updateRef: (key: string, el: HTMLElement) => {},
      toggleRef: undefined,
    };
  });

  // 属性定义和监听
  p.props.define(TOGGLE_DEFAULT_PROPS as Props);
  p.props.watch(['pressed'], ({ pressed }) => {
    _pressed.set(pressed ?? false);
    _updateContext?.({ pressed: _pressed });
  });
  p.props.watch(['disabled'], ({ disabled }) => {
    _disabled.set(disabled ?? false);
    _updateContext?.({ disabled: _disabled });
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
  });

  return {
    states: {
      pressed: _pressed,
      disabled: _disabled,
    } as ToggleState,
  };
};

export default asToggle;
