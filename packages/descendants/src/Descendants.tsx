/* --------------------------------------------------------------------------------------------------------------------
 * Skunkworks UI Descendants
 *
 * A simple Descendant Context Registration solution.
 *
 * Intended as a simple version of Reach UI's Descendants solution. Eventually hope to build this out to help
 * better understand a more complete solution similar to those used in Reach and Radix.
 *
 * -------------------------------------------------------------------------------------------------------------------*/
import React from "react";

/* -------------------------------------------------------------------------------------------------
 * Descendants
 * -----------------------------------------------------------------------------------------------*/
const getKeyFilter = (key: string) => {
  return (k: string) => k !== key;
};

type DescendantContextValue = {
  keys: string[];
  register: (key: string) => void;
  deregister: (key: string) => void;
  getIndex: (key: string) => number;
};

const DescendantContext = React.createContext<DescendantContextValue>({} as DescendantContextValue);

const DescendantProvider = ({ children }: { children: React.ReactNode }) => {
  const [keys, setKeys] = React.useState<string[]>([]);

  const register = React.useCallback((key: string) => {
    setKeys((keys) => keys.filter(getKeyFilter(key)).concat(key));
  }, []);

  const deregister = React.useCallback((key: string) => {
    setKeys((keys) => keys.filter(getKeyFilter(key)));
  }, []);

  const getIndex = React.useCallback(
    (key: string) => {
      return keys.indexOf(key);
    },
    [keys]
  );

  const contextValue = React.useMemo(
    () => ({
      keys,
      register,
      deregister,
      getIndex,
    }),
    [keys, register, deregister, getIndex]
  );

  return <DescendantContext.Provider value={contextValue}>{children}</DescendantContext.Provider>;
};

const useDescendants = () => {
  return React.useContext(DescendantContext);
};

export { DescendantProvider, useDescendants };
