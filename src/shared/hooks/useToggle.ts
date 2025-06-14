// src/shared/hooks/useToggle.ts
import { useCallback, useState } from 'react';

export function useToggle(initial = false) {
  const [isActive, setIsActive] = useState(initial);
  const toggle = useCallback(() => setIsActive((v) => !v), []);
  return { isActive, toggle, setIsActive };
}
