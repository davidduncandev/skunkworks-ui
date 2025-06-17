import { useCallback } from "react";
import { isFunction } from "./type-check";
import type { AssignableRef } from "./types";

/**
 * Passes or assigns an arbitrary value to a ref function or object.
 *
 * @param ref
 * @param value
 */
export function assignRef<RefValueType = unknown>(ref: AssignableRef<RefValueType> | null | undefined, value: unknown) {
  if (ref == null) return;
  if (isFunction(ref)) {
    ref(value as RefValueType | null);
  } else if ("current" in ref) {
    try {
      ref.current = value as RefValueType | null;
    } catch {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  } else {
    throw new Error(`Ref "${ref}" is not assignable.`);
  }
}

/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */
export function useComposedRefs<RefValueType = unknown>(...refs: (AssignableRef<RefValueType> | null | undefined)[]) {
  return useCallback(
    (node: unknown) => {
      for (const ref of refs) {
        assignRef(ref, node);
      }
    },
    [refs]
  );
}
