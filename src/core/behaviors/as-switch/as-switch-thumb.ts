import { PrototypeAPI } from '@/core/interface';
import { SwitchContext } from './interface';

const asSwitchThumb = (p: PrototypeAPI<{}>) => {
  const _checked = p.state.define(false, 'data-checked');

  p.context.watch(SwitchContext, (context, changedKeys) => {
    if (changedKeys.includes('checked')) {
      _checked.set(context.checked.value);
    }
  });

  return {
    states: {
      checked: _checked,
    },
  };
};

export default asSwitchThumb;
