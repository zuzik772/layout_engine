"use client";

import React from "react";
import { Skeleton, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-groups";
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: React.ReactNode;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
];

export const ModuleGroupsTable = () => {
  const moduleGroups = useModuleGroupSpecs();

  if (!moduleGroups || !Array.isArray(moduleGroups)) {
    return <Skeleton active />;
  }
  const data: DataType[] = moduleGroups.map((moduleGroup) => ({
    key: moduleGroup.id,
    name: <Link href={`/protected/modules/${moduleGroup.id}`}>{moduleGroup.name}</Link>,
  }));

  return <Table<DataType> columns={columns} dataSource={data} pagination={false} sticky />;
};
