import { DrawerProps } from "antd";
import React, { useState, createContext, useContext } from "react";
import { DesktopLayoutConfig, MobileLayoutConfig } from "../data/typings";

type Optional<T> = T | undefined;

type DrawerStateDto = "edit" | "create";

interface DrawerValuesDto {
  drawerLoading: boolean;
  drawerOpen: boolean;
  drawerState?: DrawerStateDto;
  selectedSpecId: number;
  selectedSpecName: string;
  size?: DrawerProps["size"];
  mobileLayoutConfig: Optional<MobileLayoutConfig>;
  desktopLayoutConfig: Optional<DesktopLayoutConfig>;
}

interface DrawerContextDto extends DrawerValuesDto {
  setDrawerLoading: (loading: boolean) => void;
  setDrawerState: (state: DrawerStateDto | undefined) => void;
  showMobileDrawer: (id: number, name: string) => void;
  showDesktopDrawer: (id: number, name: string) => void;
  closeDrawer: () => void;
  setMobileLayoutConfig: (config: Optional<MobileLayoutConfig>) => void;
  setDesktopLayoutConfig: (config: Optional<DesktopLayoutConfig>) => void;
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
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [selectedSpecId, setSelectedSpecId] = useState<number>(0);
  const [selectedSpecName, setSelectedSpecName] = useState<string>("");
  const [mobileLayoutConfig, setMobileLayoutConfig] = useState<MobileLayoutConfig>();
  const [desktopLayoutConfig, setDesktopLayoutConfig] = useState<DesktopLayoutConfig>();

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerState(undefined);
  };

  const showMobileDrawer = (id: number, name: string) => {
    setSelectedSpecId(id);
    setSelectedSpecName(name);
    setSize("default");
    setDrawerOpen(true);
  };

  const showDesktopDrawer = (id: number, name: string) => {
    setSelectedSpecId(id);
    setSelectedSpecName(name);
    setSize("large");
    setDrawerOpen(true);
  };

  return (
    <DrawerContext.Provider
      value={{
        drawerLoading,
        setDrawerLoading,
        drawerOpen: props.stayClosed ? false : drawerOpen,
        drawerState,
        setDrawerState,
        size,
        showMobileDrawer,
        showDesktopDrawer,
        closeDrawer,
        selectedSpecId,
        selectedSpecName,
        mobileLayoutConfig,
        setMobileLayoutConfig,
        desktopLayoutConfig,
        setDesktopLayoutConfig,
      }}
    >
      {props.children}
    </DrawerContext.Provider>
  );
}

export const useDrawerContext = () => useContext(DrawerContext);
export default DrawerProvider;
