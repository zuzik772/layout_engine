import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";
import { usePathname } from "next/navigation";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-group-specs";

const SelectableDropdown = () => {
  const { allModuleSpecs, setModuleSpecs } = useModuleGroupProvider();

  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const { addModuleSpec } = useModuleGroupSpecs(id);

  const items: MenuProps["items"] = allModuleSpecs.map((moduleSpec) => ({
    key: moduleSpec.id.toString(),
    label: moduleSpec.name,
  }));

  const handleSelect: MenuProps["onSelect"] = (e) => {
    const selectedModuleSpec = allModuleSpecs.find(
      (moduleSpec) => Number(moduleSpec.id) === Number(e.key)
    );
    if (!selectedModuleSpec) {
      console.error("Selected module spec not found");
      return;
    }
    addModuleSpec(selectedModuleSpec);
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
