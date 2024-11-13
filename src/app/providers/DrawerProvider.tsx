import React, { useState, createContext, useContext } from "react";

type Optional<T> = T | undefined;

type DrawerStateDto = "edit" | "create";

interface DrawerValuesDto {
  drawerLoading: boolean;
  drawerOpen: boolean;
  selectedItemId: Optional<string>;
  keyboardDisabled: boolean;
}

interface DrawerContextDto extends DrawerValuesDto {
  setDrawerLoading: (loading: boolean) => void;
  openDrawer: (id: string) => void;
  closeDrawer: () => void;
  setKeyboardDisabled: (disabled: boolean) => void;
}

const DrawerContext = createContext<DrawerContextDto>({} as DrawerContextDto);

interface DrawerProviderProps {
  stayClosed?: boolean;
  children: React.ReactNode;
}

function DrawerProvider(props: DrawerProviderProps) {
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerStateDto>();
  const [selectedItemId, setSelectedItemId] = useState<Optional<string>>();
  const [keyboardDisabled, setKeyboardDisabled] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openDrawer = (id: string) => {
    setSelectedItemId(id);
    setDrawerOpen(true);
  };

  return (
    <DrawerContext.Provider
      value={{
        drawerLoading,
        setDrawerLoading,
        drawerOpen: props.stayClosed ? false : drawerOpen,
        openDrawer,
        closeDrawer,
        selectedItemId,
        keyboardDisabled,
        setKeyboardDisabled,
      }}
    >
      {props.children}
    </DrawerContext.Provider>
  );
}

export const useDrawerContext = () => useContext(DrawerContext);
export default DrawerProvider;
