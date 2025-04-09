import { PrototypeAPI } from '@/core/interface';
import { SwitchContext, SwitchContextType, SwitchProps, SwitchState } from './interface';
import { asButton } from '../as-button';

const asSwitch = (
  p: PrototypeAPI<SwitchProps>
): {
  states: SwitchState;
} => {
  //role
  asButton(p);

  //state
  const _checked = p.state.define(false, 'data-checked');
  const _disabled = p.state.define(false);

  //context
  let _updateContext: (value: Partial<SwitchContextType>) => void = (value) => {
    //TODO: 需要优化props和context的顺序
    //throw new Error('updateContext is not initialized');
  };

  p.context.provide(SwitchContext, (updateContext) => {
    const props = p.props.get();
    _updateContext = updateContext;
    _checked.set(props.checked ?? false);

    return { checked: _checked };
  });

  //props
  p.props.define({ checked: false, onChange: () => {} });
  p.props.watch(['checked'], ({ checked }) => {
    _checked.set(checked ?? false);
    _updateContext?.({ checked: _checked });
  });
  p.props.watch(['disabled'], ({ disabled }) => {
    _disabled.set(disabled ?? false);
  });

  //event
  const _handleClick = (e: MouseEvent) => {
    const { onChange } = p.props.get();
    if (_disabled.value) return;

    _checked.set(!_checked.value);
    _updateContext?.({ checked: _checked });

    onChange?.(_checked.value);
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

  //lifecycle
  p.lifecycle.onMounted(() => {
    p.event.focus.setPriority(_disabled.value ? -1 : 0);
  });

  return {
    states: {
      checked: _checked,
    },
  };
};

export default asSwitch;
