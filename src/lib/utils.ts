// Simple throttle implementation
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean;
  let lastArgs: any;
  let lastContext: any;
  let timeout: any;

  function throttled(this: any, ...args: any[]) {
    lastArgs = args;
    lastContext = this;
    if (!inThrottle) {
      func.apply(lastContext, lastArgs);
      inThrottle = true;
      timeout = setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  }

  return throttled as T;
}
