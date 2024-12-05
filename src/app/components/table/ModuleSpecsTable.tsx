import React, { useEffect, useMemo, useState } from "react";
import { Skeleton, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ModuleSpec } from "@/app/data/typings";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { usePathname } from "next/navigation";
import { getModuleGroupSpecs } from "@/app/api/module-group-spec-module-specs/[id]";

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
};

export const ModuleSpecsTable = () => {
  const { showDesktopDrawer } = useDrawerContext();

  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>([]);

  useEffect(() => {
    getModuleGroupSpecs(id).then((data) => {
      setSelectedModuleSpecs(data);
    });
  }, [id]);

  if (!selectedModuleSpecs) {
    return <Skeleton active />;
  }
  const data: DataType[] = selectedModuleSpecs.map((spec) => ({
    key: spec.id,
    name: spec.name,
  }));

  return (
    <Table<DataType>
      rowSelection={{ ...rowSelection }}
      columns={columns}
      dataSource={data}
      pagination={false}
      sticky
      onRow={(spec) => ({
        onClick: () => showDesktopDrawer(Number(spec.key), spec.name),
      })}
    />
  );
};
