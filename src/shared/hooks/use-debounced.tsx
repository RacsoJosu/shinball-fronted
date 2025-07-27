import { useCallback, useEffect, useRef, useState } from "react";

export function useDebounce({ value, delay }: { value: string; delay: number }) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceCallback<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  delay: number
): (...args: Args) => void {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Args) => {
      const later = () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        func(...args);
      };

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(later, delay);
    },
    [func, delay]
  );
}
