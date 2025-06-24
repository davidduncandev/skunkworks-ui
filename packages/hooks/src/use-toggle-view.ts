import React from "react";
import { useControlledState } from "@skunkworks-ui/utils";
import { flushSync } from "react-dom";

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
