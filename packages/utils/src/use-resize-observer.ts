import React from "react";
import { useCallbackRef } from "./use-callback-ref";

export function useResizeObserver(element: HTMLElement | null, onResize: () => void) {
  const handleResize = useCallbackRef(onResize);
  React.useLayoutEffect(() => {
    let requestAnimationFrame = 0;
    if (element) {
      /**
       * Resize Observer will throw an often benign error that says `ResizeObserver loop completed with undelivered
       * notifications`. This means that ResizeObserver was not able to deliver all observations within a single animation
       * frame, so we use `requestAnimationFrame` to ensure we don't deliver unnecessary observations.
       * Further reading: https://github.com/WICG/resize-observer/issues/38
       */
      const resizeObserver = new ResizeObserver(() => {
        window.cancelAnimationFrame(requestAnimationFrame);
        requestAnimationFrame = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(requestAnimationFrame);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
