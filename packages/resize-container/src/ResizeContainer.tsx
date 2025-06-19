/* --------------------------------------------------------------------------------------------------------------------
 * Skunkworks UI ResizeContainer
 *
 * A component which track changes in an elements dimensions via `ResizeObserver` API.
 *
 * -------------------------------------------------------------------------------------------------------------------*/
import React, { createContext, useLayoutEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { noop, useComposedRefs, useDebounceCallback, useResizeObserver } from "@skunkworks-ui/utils";

/* -------------------------------------------------------------------------------------------------
 * ResizeContainer
 * -----------------------------------------------------------------------------------------------*/
type ContainerSize = { width: number; height: number; top: number } | null;

type ResizeContainerContextValue = {
  size: ContainerSize;
};

const ResizeContainerContext = createContext<ResizeContainerContextValue>({} as ResizeContainerContextValue);

type ResizeContainerElement = React.ElementRef<typeof Slot>;
type ResizeContainerProps = {
  onResize?: (size: ContainerSize) => void;
} & React.ComponentPropsWithoutRef<typeof Slot>;

const ResizeContainer = React.forwardRef<React.ElementRef<typeof Slot>, ResizeContainerProps>(
  ({ onResize = noop, ...props }, ref) => {
    const [containerElement, setContainerElement] = useState<ResizeContainerElement | null>(null);
    const composedRef = useComposedRefs(setContainerElement, ref);
    const [size, setSize] = useState<ContainerSize>(null);
    /**
     * Update size when the container resizes
     */
    const handleResize = useDebounceCallback(() => {
      if (containerElement) {
        const size = {
          width: containerElement.offsetWidth,
          height: containerElement.offsetHeight,
          top: containerElement.offsetTop,
        };
        setSize(size);
        // fire an optional user-supplied callback passing back the updated size
        onResize?.(size);
      }
    }, 300);
    useResizeObserver(containerElement, handleResize);
    const contextValue = React.useMemo(
      () => ({
        size,
      }),
      [size]
    );
    return (
      <ResizeContainerContext.Provider value={contextValue}>
        <Slot data-ui-resize-container="" ref={composedRef} {...props} />
      </ResizeContainerContext.Provider>
    );
  }
);

ResizeContainer.displayName = "ResizeContainer";

/* -------------------------------------------------------------------------------------------------
 * ResizeContainerItem
 * -----------------------------------------------------------------------------------------------*/
type ResizeContainerItemElement = React.ElementRef<typeof Slot>;
type ResizeContainerItemProps = {
  onResize?: (overflowed: boolean) => void;
} & React.ComponentPropsWithoutRef<typeof Slot>;
const ResizeContainerItem = React.forwardRef<React.ElementRef<typeof Slot>, ResizeContainerItemProps>(
  ({ onResize = noop, ...props }, ref) => {
    const { size } = React.useContext(ResizeContainerContext);
    const hasTop = typeof size?.top !== "undefined";
    const [containerItemElement, setContainerItemElement] = React.useState<ResizeContainerItemElement | null>(null);
    const [wrapped, setWrapped] = React.useState(false);
    const composedRef = useComposedRefs(setContainerItemElement, ref);

    useLayoutEffect(() => {
      if (containerItemElement && hasTop) {
        const isWrapped = containerItemElement?.offsetTop !== size?.top;
        setWrapped(isWrapped);
        // fire an optional user-supplied callback passing out if the list item is wrapped
        onResize?.(isWrapped);
      }
    }, [containerItemElement, hasTop, onResize, size, wrapped]);
    return <Slot data-ui-resize-container-item="" data-wrapped={wrapped} ref={composedRef} {...props} />;
  }
);

ResizeContainerItem.displayName = "ResizeContainerItem";

const Root = ResizeContainer;
const Item = ResizeContainerItem;

export {
  Root,
  Item,
  //
  ResizeContainer,
  ResizeContainerItem,
};
