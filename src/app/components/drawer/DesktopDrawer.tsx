"use client";

import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { Drawer, Button, Space } from "antd";
import DrawerContent from "./DrawerContent";
import LayoutTypeProvider from "./layout/LayoutProvider";

function DesktopDrawer() {
  const { size, drawerOpen, closeDrawer, selectedItemId } = useDrawerContext();

  console.log("selectedItemId", selectedItemId);
  return (
    <>
      <Drawer
        title={"Edit " + selectedItemId}
        placement="right"
        size={size}
        onClose={closeDrawer}
        open={drawerOpen}
        footer={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button type="primary" onClick={closeDrawer}>
              Publish
            </Button>
          </Space>
        }
      >
        <LayoutTypeProvider>
          <DrawerContent />
        </LayoutTypeProvider>
      </Drawer>
    </>
  );
}

export default DesktopDrawer;
