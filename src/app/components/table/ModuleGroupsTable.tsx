"use client";

import React from "react";
import { Skeleton, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useModuleGroups } from "@/app/hooks/use-module-groups";
import { useRouter } from "next/navigation";

interface DataType {
  key: React.Key;
  name: React.ReactNode;
}

export const ModuleGroupsTable = () => {
  const { isLoading, error, moduleGroups } = useModuleGroups();
  const router = useRouter();

  if (isLoading || !Array.isArray(moduleGroups)) {
    return <Skeleton active />;
  }

  if (error) {
    return <p>Failed to load module groups</p>;
  }
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <>{name}</>,
    },
  ];

  const data: DataType[] = moduleGroups.map((moduleGroup) => ({
    key: moduleGroup.id,
    name: moduleGroup.name,
  }));

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      pagination={false}
      sticky
      onRow={(record) => ({
        onClick: () => router.push(`/protected/modules/${record.key}`),
        style: { cursor: "pointer" },
      })}
    />
  );
};
