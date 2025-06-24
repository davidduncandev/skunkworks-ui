/* --------------------------------------------------------------------------------------------------------------------
 * Skunkworks UI ToggleView
 *
 * A component which allows toggling between two views, with focus management for accessibility.
 *
 * -------------------------------------------------------------------------------------------------------------------*/
import React from "react";
import { flushSync } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { composeEventHandlers, createContext, useComposedRefs, useControlledState } from "@skunkworks-ui/utils";

/* -------------------------------------------------------------------------------------------------
 * ToggleView
 * -----------------------------------------------------------------------------------------------*/

type InternalToggleViewContextValue = {
  switched: boolean;
  onSwitchedToggle(this: void): void;
  focusTargetRef: React.RefObject<HTMLElement | null>;
};

const [ToggleViewProvider, useToggleViewCtx] = createContext<InternalToggleViewContextValue>("ToggleView");

type ToggleViewComponentProps = {
  children: React.ReactNode;
  switched?: boolean;
  defaultSwitched?: boolean;
  onSwitchedChange?: (switched: boolean) => void;
};

const ToggleView = ({
  switched: switchedProp,
  defaultSwitched = false,
  onSwitchedChange: onSwitchedChangeProp,
  children,
}: ToggleViewComponentProps) => {
  const [switched, setSwitched] = useControlledState({
    controlledValue: switchedProp,
    defaultValue: defaultSwitched,
  });
  const focusTargetRef = React.useRef<HTMLElement>(null);
  const onSwitchedToggle = React.useCallback(() => {
    flushSync(() => {
      setSwitched((prevSwitched) => !prevSwitched);
      onSwitchedChangeProp?.(!switched);
    });
    focusTargetRef.current?.focus();
  }, [onSwitchedChangeProp, setSwitched, switched]);

  return (
    <ToggleViewProvider focusTargetRef={focusTargetRef} switched={switched} onSwitchedToggle={onSwitchedToggle}>
      {children}
    </ToggleViewProvider>
  );
};

ToggleView.displayName = "ToggleView";

/* -------------------------------------------------------------------------------------------------
 * ToggleViewContent - this is the view that is shown when not switched
 * -----------------------------------------------------------------------------------------------*/

const ToggleViewContent = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, forwardedRef) => {
    const { switched } = useToggleViewCtx("ToggleViewContent");
    return !switched ? <Slot data-toggle-view-content="" ref={forwardedRef} {...props} /> : null;
  }
);

ToggleViewContent.displayName = "ToggleViewContent";

/* -------------------------------------------------------------------------------------------------
 * ToggleViewSwitchedContent - this is the view that is shown when switched
 * -----------------------------------------------------------------------------------------------*/

const ToggleViewSwitchedContent = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, forwardedRef) => {
  const { switched } = useToggleViewCtx("ToggleViewTarget");
  return switched ? <Slot data-toggle-view-switched-content="" ref={forwardedRef} {...props} /> : null;
});

ToggleViewSwitchedContent.displayName = "ToggleViewSwitchedContent";

/* -------------------------------------------------------------------------------------------------
 * ToggleViewTrigger
 * -----------------------------------------------------------------------------------------------*/

type ToggleViewTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

const ToggleViewTrigger = React.forwardRef<React.ElementRef<"button">, ToggleViewTriggerProps>(
  ({ asChild, onClick, ...props }, forwardedRef) => {
    const { onSwitchedToggle } = useToggleViewCtx("ToggleViewTrigger");
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        data-toggle-view-trigger=""
        ref={forwardedRef}
        type="button"
        {...props}
        onClick={composeEventHandlers(onClick, onSwitchedToggle)}
      />
    );
  }
);

ToggleViewTrigger.displayName = "ToggleViewTrigger";

/* -------------------------------------------------------------------------------------------------
 * ToggleViewTargetFocus
 * -----------------------------------------------------------------------------------------------*/

const ToggleViewTargetFocus = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, forwardedRef) => {
  const { focusTargetRef } = useToggleViewCtx("ToggleViewTargetFocus");
  const composedRef = useComposedRefs(forwardedRef, focusTargetRef);

  return <Slot data-toggle-view-focus-target="" ref={composedRef} {...props} />;
});

ToggleViewTargetFocus.displayName = "ToggleViewTargetFocus";

/* -------------------------------------------------------------------------------------------------
 * ToggleViewTargetHeadingFocus
 * -----------------------------------------------------------------------------------------------*/

const ToggleViewTargetHeadingFocus = React.forwardRef<
  React.ElementRef<typeof ToggleViewTargetFocus>,
  React.ComponentPropsWithoutRef<typeof ToggleViewTargetFocus>
>(({ ...props }, forwardedRef) => {
  return <ToggleViewTargetFocus data-toggle-view-heading-focus-target="" ref={forwardedRef} tabIndex={-1} {...props} />;
});

ToggleViewTargetHeadingFocus.displayName = "ToggleViewTargetHeadingFocus";

const Root = ToggleView;
const Trigger = ToggleViewTrigger;
const Content = ToggleViewContent;
const SwitchedContent = ToggleViewSwitchedContent;
const TargetFocus = ToggleViewTargetFocus;
const TargetHeading = ToggleViewTargetHeadingFocus;

export {
  Root,
  Trigger,
  Content,
  SwitchedContent,
  TargetFocus,
  TargetHeading,
  //
  ToggleView,
  ToggleViewContent,
  ToggleViewTrigger,
  ToggleViewSwitchedContent,
  ToggleViewTargetFocus,
  ToggleViewTargetHeadingFocus,
};

export type { ToggleViewComponentProps, ToggleViewTriggerProps };

export type ToggleViewProps = {
  switched?: boolean;
  defaultSwitched?: boolean;
  onSwitchedChange?: (switched: boolean) => void;
};

export const useToggleView = ({
  switched: switchedProp,
  defaultSwitched = false,
  onSwitchedChange,
}: ToggleViewProps = {}) => {
  const [switched, setSwitched] = useControlledState({
    controlledValue: switchedProp,
    defaultValue: defaultSwitched,
  });
  const focusTargetRef = React.useRef<HTMLElement>(null);
  const onSwitchedToggle = React.useCallback(() => {
    flushSync(() => {
      setSwitched((prevSwitched) => !prevSwitched);
      onSwitchedChange?.(!switched);
    });
    focusTargetRef.current?.focus();
  }, [onSwitchedChange, setSwitched, switched]);

  return React.useMemo(
    () => ({
      focusTargetRef,
      onSwitchedToggle,
      switched,
    }),
    [focusTargetRef, onSwitchedToggle, switched]
  );
};
