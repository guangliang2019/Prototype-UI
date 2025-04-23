import { PrototypeAPI } from '@/core/interface';
import { SwitchContext } from './interface';

const asSwitchThumb = (p: PrototypeAPI) => {
  const _checked = p.state.define(false, 'data-checked');

  p.context.watch(SwitchContext, (context, changedKeys) => {
    if (changedKeys.includes('checked')) {
      _checked.set(context.checked.value);
    }
    if (changedKeys.includes('disabled')) {
      const element = p.view.getElement();
      context.disabled ? element.setAttribute('disabled', '') : element.removeAttribute('disabled');
    }
  });

  p.lifecycle.onMounted(() => {
    const context = p.context.get(SwitchContext);
    const element = p.view.getElement();
    context.disabled ? element.setAttribute('disabled', '') : element.removeAttribute('disabled');
  });

  return {
    states: {
      checked: _checked,
    },
  };
};

export default asSwitchThumb;
