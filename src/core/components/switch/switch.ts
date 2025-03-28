import { Prototype } from '@/core/interface';
import { asTrigger } from '../trigger';
import { defineProps, useAttributeState, useConnect, useDisconnect } from '@/core/lifecycle';
import useEventListener from '@/core/hooks/use-event-listener';
import { SwitchProps, SwitchContext } from './interface';
import { provideContext, watchContext } from '@/core/context';

// 创建上下文键
export const SwitchStateContext = Symbol('SwitchState');

const asSwitch = (p: Prototype<SwitchProps>): void => {
  //role
  asTrigger(p);

  //state
  const _checked = useAttributeState<boolean>(p, 'checked', false);
  const _disabled = useAttributeState<boolean>(p, 'disabled', false);

  //context
  let _updateContext: (value: Partial<SwitchContext>, notify?: boolean) => void = (value) => {
    //TODO: 需要优化props和context的顺序
    //throw new Error('updateContext is not initialized');
  };
  provideContext<SwitchContext>(p, SwitchStateContext, (updateContext) => {
    _updateContext = updateContext;
    _checked.value = !!p.props?.checked;
    _disabled.value = !!p.props?.disabled;

    return { checked: _checked, disabled: _disabled };
  });

  //props
  defineProps(
    p,
    {
      label: '',
      disabled: false,
      checked: false,
      onChange: () => {},
    },
    (key, value) => {
      switch (key) {
        case 'disabled':
          _disabled.value = Boolean(value);
          _updateContext?.({ disabled: _disabled });
          if (value) p.componentRef.tabIndex = -1;
          else p.componentRef.tabIndex = 0;
          break;
        case 'checked':
          _checked.value = Boolean(value);
          _updateContext?.({ checked: _checked });
          break;
        default:
          break;
      }
    }
  );

  //event
  const _handleClick = (e: MouseEvent) => {
    const component = p.componentRef;
    if (_disabled.value) return;

    _checked.value = !_checked.value;
    //@ts-ignore
    _updateContext?.({ checked: _checked });

    component.onChange?.(
      new CustomEvent('change', {
        detail: { checked: _checked.value },
      })
    );
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

  //lifecycle
  useConnect(p, () => {
    p.componentRef.setAttribute('role', 'switch');
    p.componentRef.tabIndex = _disabled.value ? -1 : 0;
  });
};

export const asSwitchThumb = (p: Prototype<SwitchProps>): void => {
  //state
  const _checked = useAttributeState<boolean>(p, 'checked', false);
  const _disabled = useAttributeState<boolean>(p, 'disabled', false);

  //context
  watchContext<SwitchContext>(p, SwitchStateContext, (context) => {
    const component = p.componentRef;
    if (!component) return;

    // 更新数据属性
    _checked.value = context.checked.value;
    _disabled.value = context.disabled.value;
  });
};

export default asSwitch;
