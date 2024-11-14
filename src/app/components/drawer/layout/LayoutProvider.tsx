import React, { useState, createContext, useContext } from "react";

interface LayoutContextDto {
  isMobileLayout: boolean;
  isWebLayout: boolean;
  setIsMobileLayout: (isMobileLayout: boolean) => void;
  setIsWebLayout?: (isWebLayout: boolean) => void;
}

const LayoutTypeContext = createContext<LayoutContextDto>({} as LayoutContextDto);

interface LayoutProviderProps {
  stayClosed?: boolean;
  children: React.ReactNode;
}

function LayoutTypeProvider(props: LayoutProviderProps) {
  const [isMobileLayout, setIsMobileLayout] = useState(true);
  const [isWebLayout, setIsWebLayout] = useState(false);

  return (
    <LayoutTypeContext.Provider
      value={{
        isMobileLayout,
        isWebLayout,
        setIsMobileLayout,
        setIsWebLayout,
      }}
    >
      {props.children}
    </LayoutTypeContext.Provider>
  );
}

export const useLayoutTypeContext = () => useContext(LayoutTypeContext);
export default LayoutTypeProvider;
