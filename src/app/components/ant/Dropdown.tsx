import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";
import module_specs from "../../data/module_specs.json";
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
    console.log(e);
    console.log(moduleSpecs);
    const selectedModuleSpec = moduleSpecs.find(
      (moduleSpec) => moduleSpec.id === e.key
    );
    selectedModuleSpec &&
      setModuleSpecs(moduleSpecs.concat(selectedModuleSpec));
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["3"],
        onSelect: (e) => handleSelect(e),
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
