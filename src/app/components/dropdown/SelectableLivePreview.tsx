import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Typography } from "antd";
import { usePathname } from "next/navigation";

const SelectableLivePreview = () => {
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const items: MenuProps["items"] = [
    { key: "mobile", label: "Mobile Preview" },
    { key: "desktop", label: "Desktop Preview" },
  ];

  const handleSelect: MenuProps["onSelect"] = (e) => {
    console.log(e);
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        onSelect: (e) => handleSelect(e),
        style: { maxHeight: 400, overflowY: "auto" },
      }}
    >
      <Typography.Link>
        <Button>
          Live preview <DownOutlined />
        </Button>
      </Typography.Link>
    </Dropdown>
  );
};

export default SelectableLivePreview;
