import { useEffect, useState } from "react";

export function useDebounce({
  value,
  delay,
}: {
  value: string;
  delay: number;
}) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
