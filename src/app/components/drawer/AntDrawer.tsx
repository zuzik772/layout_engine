"use client";

import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { Drawer, Button, Space } from "antd";
import { useLayoutTypeContext } from "./layout/LayoutProvider";
import DrawerDesktopContent from "./DrawerDesktopContent";
import DrawerMobileContent from "./DrawerMobileContent";
import { useEffect } from "react";

function AntDrawer() {
  const {
    size,
    drawerOpen,
    closeDrawer,
    selectedSpecName,
    mobileLayoutConfig,
  } = useDrawerContext();
  const { isMobileLayout } = useLayoutTypeContext();

  useEffect(() => {
    console.log("Mobile layout config changed", mobileLayoutConfig);
  }, [mobileLayoutConfig]);
  const handleMobilePublish = () => {
    console.log("Publishing layout configuration for ", mobileLayoutConfig);
    closeDrawer();
  };
  return (
    <>
      <Drawer
        title={"Layout configuration for " + selectedSpecName}
        placement="right"
        size={size}
        onClose={closeDrawer}
        open={drawerOpen}
        footer={
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button type="primary" onClick={handleMobilePublish}>
              Publish
            </Button>
          </Space>
        }
      >
        {isMobileLayout ? <DrawerMobileContent /> : <DrawerDesktopContent />}
      </Drawer>
    </>
  );
}

export default AntDrawer;
