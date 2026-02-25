function ThrottleRequest<T extends (...args: any[]) => any>(
  func: T,
  limit: number
) {
  let lastCall = 0;

  return function(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> | void {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return func.apply(this, args);
    }
  };
}

export default ThrottleRequest;
