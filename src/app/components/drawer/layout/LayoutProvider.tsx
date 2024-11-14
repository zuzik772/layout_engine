import React, { useState, createContext, useContext } from "react";

interface LayoutContextDto {
  isMobileLayout: boolean;
  setIsMobileLayout: (isMobileLayout: boolean) => void;
}

const LayoutTypeContext = createContext<LayoutContextDto>({} as LayoutContextDto);

interface LayoutProviderProps {
  stayClosed?: boolean;
  children: React.ReactNode;
}

function LayoutTypeProvider(props: LayoutProviderProps) {
  const [isMobileLayout, setIsMobileLayout] = useState(true);

  return (
    <LayoutTypeContext.Provider
      value={{
        isMobileLayout,
        setIsMobileLayout,
      }}
    >
      {props.children}
    </LayoutTypeContext.Provider>
  );
}

export const useLayoutTypeContext = () => useContext(LayoutTypeContext);
export default LayoutTypeProvider;
