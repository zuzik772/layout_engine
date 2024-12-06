import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Typography } from "antd";
import { usePathname } from "next/navigation";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-group-specs";
import { useModuleSpecs } from "@/app/hooks/use-module-specs";

const SelectableMobileSpec = () => {
  const { moduleSpecs } = useModuleSpecs();

  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const { addModuleSpec } = useModuleGroupSpecs(id);

  const items: MenuProps["items"] =
    moduleSpecs &&
    moduleSpecs.map((moduleSpec) => ({
      key: moduleSpec.id.toString(),
      label: moduleSpec.name,
    }));

  const handleSelect: MenuProps["onSelect"] = (e) => {
    const selectedModuleSpec = moduleSpecs && moduleSpecs.find((moduleSpec) => Number(moduleSpec.id) === Number(e.key));
    if (!selectedModuleSpec) {
      console.error("Selected module spec not found");
      return;
    }
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
        <Button type="primary">
          Add module spec <DownOutlined />
        </Button>
      </Typography.Link>
    </Dropdown>
  );
};

export default SelectableMobileSpec;
