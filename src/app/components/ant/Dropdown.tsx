import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";
import { ModuleSpec } from "@/app/data/typings";

const SelectableDropdown = ({
  moduleSpecs,
  setModuleSpecs,
}: {
  moduleSpecs: ModuleSpec[];
  setModuleSpecs: any;
}) => {
  const items: MenuProps["items"] = moduleSpecs.map((moduleSpec) => ({
    key: moduleSpec.id.toString(),
    label: moduleSpec.name,
  }));

  const handleSelect: MenuProps["onSelect"] = (e) => {
    const selectedModuleSpec = moduleSpecs.find(
      (moduleSpec) => Number(moduleSpec.id) === Number(e.key)
    );
    console.log(selectedModuleSpec);
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
        <Space>Add module spec</Space>
        <DownOutlined />
      </Typography.Link>
    </Dropdown>
  );
};

export default SelectableDropdown;
