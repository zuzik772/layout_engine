import { DrawerProps } from "antd";
import { get } from "http";
import React, { useState, createContext, useContext, use, useEffect } from "react";
import { getMobileConfig } from "../api/mobile-layout-configuration/[id]";

type Optional<T> = T | undefined;

type DrawerStateDto = "edit" | "create";

interface DrawerValuesDto {
  drawerLoading: boolean;
  drawerOpen: boolean;
  selectedSpecId: number;
  selectedSpecName: string;
  size?: DrawerProps["size"];
  mobileLayoutConfig: MobileLayoutConfig | undefined;
}

interface DrawerContextDto extends DrawerValuesDto {
  setDrawerLoading: (loading: boolean) => void;
  showMobileDrawer: (id: number, name: string) => void;
  showDesktopDrawer: (id: number, name: string) => void;
  closeDrawer: () => void;
  setMobileLayoutConfig: (config: Optional<MobileLayoutConfig>) => void;
}

const DrawerContext = createContext<DrawerContextDto>({} as DrawerContextDto);

interface DrawerProviderProps {
  stayClosed?: boolean;
  children: React.ReactNode;
}

export interface MobileLayoutConfig {
  spec_id: number;
  title?: string;
  type?: string;
  columns?: number;
  rows?: number;
  boxed?: boolean;
}

function DrawerProvider(props: DrawerProviderProps) {
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [selectedSpecId, setSelectedSpecId] = useState<number>(0);
  const [selectedSpecName, setSelectedSpecName] = useState<string>("");
  const [mobileLayoutConfig, setMobileLayoutConfig] = useState<MobileLayoutConfig>();

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const showMobileDrawer = (id: number, name: string) => {
    setSelectedSpecId(id);
    setSelectedSpecName(name);
    setSize("default");
    setDrawerOpen(true);
    getMobileConfig(id).then((config) => {
      setMobileLayoutConfig(config);
    });
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
        size,
        showMobileDrawer,
        showDesktopDrawer,
        closeDrawer,
        selectedSpecId,
        selectedSpecName,
        mobileLayoutConfig,
        setMobileLayoutConfig,
      }}
    >
      {props.children}
    </DrawerContext.Provider>
  );
}

export const useDrawerContext = () => useContext(DrawerContext);
export default DrawerProvider;
