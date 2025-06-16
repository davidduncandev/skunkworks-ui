import { useState, useRef, useCallback } from 'react';

/**
 * Check if a component is controlled or uncontrolled and return the correct
 * state value and setter accordingly. If the component state is controlled by
 * the app, the setter is a noop.
 *
 * @param controlledValue
 * @param defaultValue
 */
export function useControlledState<T = any>({
  controlledValue,
  defaultValue
}: {
  controlledValue: T | undefined;
  defaultValue: T | (() => T);
}): [T, React.Dispatch<React.SetStateAction<T>>] {
  const wasControlled = controlledValue !== undefined;
  const isControlledRef = useRef(wasControlled);

  const [valueState, setValue] = useState(isControlledRef.current ? controlledValue! : defaultValue);
  const set: React.Dispatch<React.SetStateAction<T>> = useCallback(n => {
    if (!isControlledRef.current) {
      setValue(n);
    }
  }, []);
  return [isControlledRef.current ? (controlledValue as T) : valueState, set];
}
