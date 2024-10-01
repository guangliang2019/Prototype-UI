interface RouteChange {
  from: string;
  to: string;
  action: 'push' | 'replace' | 'back' | 'forward' | 'go';
}

class Router {
  private static _instance: Router | null = null; // 静态实例
  private _currentPath: string;
  private _historyDepth: number;
  private _prevHistoryDepth: number;

  // 私有化构造函数，防止外部实例化
  private constructor() {
    this._currentPath = window.location.pathname;
    this._historyDepth = window.history.length; // 初始化当前历史深度
    this._prevHistoryDepth = this._historyDepth;
    window.addEventListener('popstate', this.onPopState);
  }

  // 获取 Router 的唯一实例
  public static getInstance(): Router {
    if (!Router._instance) {
      Router._instance = new Router();
    }
    return Router._instance;
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

    this.onLocationChange(reason);
  };

  // push 方法用于添加新的历史条目
  public push(url: string, state?: any): void {
    const from = this._currentPath;
    const to = url;
    history.pushState({ ...state, from, to }, '', url);
    this._currentPath = to;
    this._historyDepth++;
    this._prevHistoryDepth = this._historyDepth;

    const reason: RouteChange = {
      from,
      to,
      action: 'push',
    };

    this.onLocationChange(reason);
  }

  // replace 方法用于替换当前历史条目
  public replace(url: string, state?: any): void {
    const from = this._currentPath;
    const to = url;
    history.replaceState({ ...state, from, to }, '', url);
    this._currentPath = to;

    const reason: RouteChange = {
      from,
      to,
      action: 'replace',
    };

    this.onLocationChange(reason);
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

  // 当路由变更时，触发此方法
  private onLocationChange(reason: RouteChange): void {
    console.log('Route change detected:');
    console.log(`From: ${reason.from}`);
    console.log(`To: ${reason.to}`);
    console.log(`Action: ${reason.action}`);
  }
}

// 使用单例模式调用 Router
const router = Router.getInstance();

// 使用 push 添加一个新的路径
router.push('/about');

// 使用 replace 替换当前路径
router.replace('/contact');

// 前进后退
router.back();
router.forward();

// 在新窗口打开指定的链接
router.open('https://example.com');
