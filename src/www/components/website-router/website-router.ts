export interface RouteChange {
  from: string;
  to: string;
  action: 'push' | 'replace' | 'back' | 'forward' | 'go';
}

export default class WebsiteRouter {
  private static _instance: WebsiteRouter | null = null; // 静态实例
  private _currentPath: string;
  private _historyDepth: number;
  private _prevHistoryDepth: number;
  private _guards: Array<(reason: RouteChange) => boolean | Promise<boolean>>; // 路由守卫队列

  // 私有化构造函数，防止外部实例化
  private constructor() {
    this._currentPath = window.location.pathname;
    this._historyDepth = window.history.length; // 初始化当前历史深度
    this._prevHistoryDepth = this._historyDepth;
    this._guards = []; // 初始化守卫队列
    window.addEventListener('popstate', this.onPopState);
  }

  // 获取 WebsiteRouter 的唯一实例
  public static getInstance(): WebsiteRouter {
    if (!WebsiteRouter._instance) {
      WebsiteRouter._instance = new WebsiteRouter();
    }
    return WebsiteRouter._instance;
  }

  // 处理 'popstate' 事件
  private onPopState = (event: PopStateEvent) => {
    const to = window.location.pathname;
    const from = this._currentPath;
    const newDepth = window.history.length;

    let action: RouteChange['action'];
    if (newDepth > this._prevHistoryDepth) {
      action = 'forward'; // 前进
    } else if (newDepth < this._prevHistoryDepth) {
      action = 'back'; // 后退
    } else {
      action = 'go'; // 使用 go 方法
    }

    this._prevHistoryDepth = newDepth;
    this._currentPath = to;

    const reason: RouteChange = {
      from,
      to,
      action,
    };

    this.runGuards(reason).then((canNavigate) => {
      if (canNavigate) {
        this.onLocationChange(reason);
      } else {
        // 如果守卫返回 false，则阻止路由变更
        history.go(-1); // 回退到之前的路由
      }
    });
  };

  // push 方法用于添加新的历史条目
  public push(url: string, state?: any): void {
    const from = this._currentPath;
    const to = url;
    const reason: RouteChange = {
      from,
      to,
      action: 'push',
    };

    this.runGuards(reason).then((canNavigate) => {
      if (canNavigate) {
        console.log(from,to,url,state)
        history.pushState({ ...state, from, to }, '', url);
        this._currentPath = to;
        this._historyDepth++;
        this._prevHistoryDepth = this._historyDepth;

        this.onLocationChange(reason);
      }
    });
  }

  // replace 方法用于替换当前历史条目
  public replace(url: string, state?: any): void {
    const from = this._currentPath;
    const to = url;
    const reason: RouteChange = {
      from,
      to,
      action: 'replace',
    };

    this.runGuards(reason).then((canNavigate) => {
      if (canNavigate) {
        history.replaceState({ ...state, from, to }, '', url);
        this._currentPath = to;
        this.onLocationChange(reason);
      }
    });
  }

  // go 方法用于前进或后退 n 步
  public go(n: number): void {
    this._historyDepth += n; // 更新历史深度计数
    history.go(n);
  }

  // back 方法用于后退一步
  public back(): void {
    this.go(-1); // 后退 1 步
  }

  // forward 方法用于前进一步
  public forward(): void {
    this.go(1); // 前进 1 步
  }

  // open 方法用于在新窗口中打开链接
  public open(url: string): void {
    window.open(url, '_blank');
  }

  // 添加路由守卫
  public addGuard(guard: (reason: RouteChange) => boolean | Promise<boolean>): void {
    this._guards.push(guard);
  }

  // 移除路由守卫
  public removeGuard(guard: (reason: RouteChange) => boolean | Promise<boolean>): void {
    this._guards = this._guards.filter((g) => g !== guard);
  }

  // 依次执行守卫队列，决定是否继续路由变更
  private async runGuards(reason: RouteChange): Promise<boolean> {
    for (const guard of this._guards) {
      const result = await guard(reason);
      if (!result) {
        return false; // 如果任一守卫返回 false，则阻止路由变更
      }
    }
    return true; // 全部守卫通过，允许路由变更
  }

  // 当路由变更时，触发此方法
  private onLocationChange(reason: RouteChange): void {}
}
