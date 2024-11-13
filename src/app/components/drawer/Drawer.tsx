"use client";

import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { Drawer, Button, Space } from "antd";
import DrawerContent from "./DrawerContent";

function AntDrawer() {
  const { drawerOpen, closeDrawer, selectedItemId } = useDrawerContext();

  console.log("selectedItemId", selectedItemId);
  return (
    <>
      <Drawer
        title={"Edit " + selectedItemId}
        placement="right"
        size={"large"}
        onClose={closeDrawer}
        open={drawerOpen}
        footer={
          <Space>
            <Button onClick={closeDrawer}>Revert changes</Button>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button type="primary" onClick={closeDrawer}>
              Publish
            </Button>
          </Space>
        }
      >
        <DrawerContent />
      </Drawer>
    </>
  );
}

export default AntDrawer;
