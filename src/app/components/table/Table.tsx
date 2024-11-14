import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { getModuleGroupSpecs } from "@/app/api/module-group-specs/api";
import { ModuleSpec } from "@/app/data/typings";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";
import { usePathname } from "next/navigation";

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Module Spec",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
];

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

export const CustomTable = () => {
  const { openDrawer } = useDrawerContext();

  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>([]);

  useEffect(() => {
    getModuleGroupSpecs(id).then((data) => {
      setSelectedModuleSpecs(data);
    });
  }, []);

  const memoizedSelectedGroupSpecs = useMemo(() => selectedModuleSpecs, [selectedModuleSpecs]);

  const data: DataType[] = memoizedSelectedGroupSpecs.map((spec) => ({ key: spec.id, name: spec.name }));

  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">("checkbox");

  return (
    <Table<DataType>
      rowSelection={{ type: selectionType, ...rowSelection }}
      columns={columns}
      dataSource={data}
      onRow={(spec) => ({
        onClick: () => openDrawer(spec.name),
      })}
    />
  );
};
