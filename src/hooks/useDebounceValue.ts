import { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';

export const useDebounceValue = <T>(value: T, delay = 0) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    if (isEqual(previousValueRef.current, value)) {
      return;
    }

    previousValueRef.current = value;

    if (delay === 0) {
      setDebouncedValue(value);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  if (delay === 0) {
    return value;
  }

  return debouncedValue;
};
