import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number): T | undefined => {
  const [debValue, setDebValue] = useState<T>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debValue;
};
