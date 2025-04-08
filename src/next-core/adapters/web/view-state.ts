import { ViewState } from '@/next-core/interface';

// 视图状态管理器
export class ViewStateManager {
  private _state: ViewState = ViewState.NORMAL;
  private _stateStack: ViewState[] = [];

  // 进入特定状态
  enterState(state: ViewState) {
    this._stateStack.push(this._state);
    this._state = state;
  }

  // 退出当前状态
  exitState() {
    if (this._stateStack.length > 0) {
      this._state = this._stateStack.pop()!;
    }
  }

  // 获取当前状态
  getState(): ViewState {
    return this._state;
  }

  // 检查是否处于特定状态
  isInState(state: ViewState): boolean {
    return this._state === state;
  }
}
