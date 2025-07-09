// WebAnimationLoop.ts

export type FrameTask = {
  id: string;
  callback: (dt: number, time: DOMHighResTimeStamp) => void;
  priority?: 'high' | 'low';
  autoRemove?: boolean;
};

export interface AnimationLoop {
  register(task: FrameTask): () => void;
  unregister(id: string): void;

  setPlaybackRate(rate: number): void;
  getPlaybackRate(): number;

  onStats?: (stats: { fps: number; dropped: number }) => void;

  start(): void;
  stop(): void;
  isRunning(): boolean;
  getNow(): DOMHighResTimeStamp;
  dispose(): void;
}

export class WebAnimationLoop implements AnimationLoop {
  private tasks = new Map<string, FrameTask>();
  private running = false;
  private lastTime = 0;
  private rafId: number | null = null;
  private playbackRate = 1.0;

  private frameCount = 0;
  private statWindow: number[] = [];
  private lastStatTime = 0;

  public onStats?: (stats: { fps: number; dropped: number }) => void;

  constructor() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  register(task: FrameTask): () => void {
    this.tasks.set(task.id, task);
    this.ensureRunning();
    return () => this.unregister(task.id);
  }

  unregister(id: string): void {
    this.tasks.delete(id);
    if (this.tasks.size === 0) this.stop();
  }

  setPlaybackRate(rate: number): void {
    this.playbackRate = Math.max(0, rate);
  }

  getPlaybackRate(): number {
    return this.playbackRate;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  isRunning(): boolean {
    return this.running;
  }

  getNow(): DOMHighResTimeStamp {
    return performance.now();
  }

  dispose(): void {
    this.stop();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.tasks.clear();
  }

  private ensureRunning(): void {
    if (!this.running) this.start();
  }

  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      this.stop();
    } else if (this.tasks.size > 0) {
      this.start();
    }
  };

  private tick = (now: DOMHighResTimeStamp): void => {
    const rawDt = now - this.lastTime;
    this.lastTime = now;

    const dt = rawDt * this.playbackRate;

    // Stats tracking
    this.frameCount++;
    this.statWindow.push(rawDt);
    if (now - this.lastStatTime > 1000) {
      const avg = this.statWindow.reduce((a, b) => a + b, 0) / this.statWindow.length;
      const fps = 1000 / avg;
      const dropped = Math.max(0, Math.round(60 - fps));
      this.onStats?.({ fps: Math.round(fps), dropped });
      this.statWindow = [];
      this.lastStatTime = now;
    }

    // Run tasks if playback is not paused
    if (this.playbackRate > 0) {
      this.tasks.forEach((task, id) => {
        try {
          task.callback(dt, now);
          if (task.autoRemove) this.unregister(id);
        } catch (err) {
          console.error(`[AnimationLoop] Task "${id}" threw error:`, err);
        }
      });
    }

    if (this.running && this.tasks.size > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.stop();
    }
  };
}

let defaultLoop: WebAnimationLoop | null = null

export const getDefaultAnimationLoop = () => {
  if (!defaultLoop) {
    defaultLoop = new WebAnimationLoop()
  }
  return defaultLoop
}