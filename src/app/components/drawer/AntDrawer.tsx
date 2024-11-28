"use client";

import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { Drawer } from "antd";
import { useLayoutTypeContext } from "./layout/LayoutProvider";
import DrawerDesktopContent from "./DrawerDesktopContent";
import DrawerMobileContent from "./DrawerMobileContent";

function AntDrawer() {
  const { size, drawerOpen, closeDrawer, selectedSpecName } = useDrawerContext();
  const { isMobileLayout } = useLayoutTypeContext();

  return (
    <>
      <Drawer title={"Layout configuration for " + selectedSpecName} placement="right" size={size} onClose={closeDrawer} open={drawerOpen}>
        {isMobileLayout ? <DrawerMobileContent /> : <DrawerDesktopContent />}
      </Drawer>
    </>
  );
}

export default AntDrawer;
