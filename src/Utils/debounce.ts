export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number,
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function (...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
