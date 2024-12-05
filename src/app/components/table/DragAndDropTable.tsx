import React, { useEffect, useState } from "react";
import { Button, Modal, Skeleton, Space, Table } from "antd";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import {
  DeleteOutlined,
  DesktopOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
  MenuOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { usePathname } from "next/navigation";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-group-specs";
import { useModuleSpecs } from "@/app/hooks/use-module-specs";
import { useSpecsPositions } from "@/app/hooks/use-specs-positions";
import { updateSpecsPositions } from "@/app/api/specs-positions/[id]";
import { useLayoutTypeContext } from "../drawer/layout/LayoutProvider";
import TableStatusTag from "./StatusTag";
import { useMobileLayoutConfig } from "@/app/hooks/use-mobile-layout-config";
import { getMobileConfigIDS } from "@/app/api/mobile-layout-configuration";
import { useDesktopLayoutConfig } from "@/app/hooks/use-desktop-layout-config";
import { getDesktopConfigIDS } from "@/app/api/desktop-layout-configuration";

interface DataType {
  key: string;
  name: string;
  current_position: number;
  disabled: boolean;
}
const DraggableTable: React.FC = () => {
  const { showMobileDrawer, showDesktopDrawer, drawerState, selectedSpecId } = useDrawerContext();
  const { setIsMobileLayout } = useLayoutTypeContext();
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const { isLoading, error, moduleGroupSpecs, deleteModuleSpec, updateModuleSpec } = useModuleGroupSpecs(id);
  const { moduleSpecs } = useModuleSpecs();
  const { specsPositions } = useSpecsPositions(id);
  const { mobileConfig } = useMobileLayoutConfig(selectedSpecId);
  const { desktopConfig } = useDesktopLayoutConfig(selectedSpecId);
  const [mobilePublishedIds, setMobilePublishedIds] = useState<number[]>([]);
  const [desktopPublishedIds, setDesktopPublishedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchPublishedIds = async () => {
      try {
        const [mobilePublishedIds, desktopPublishedIds] = await Promise.all([getMobileConfigIDS(), getDesktopConfigIDS()]);

        setMobilePublishedIds(mobilePublishedIds?.map((spec: { spec_id: number }) => spec.spec_id) ?? []);
        setDesktopPublishedIds(desktopPublishedIds?.map((spec: { spec_id: number }) => spec.spec_id) ?? []);

        const isPublished =
          selectedSpecId &&
          (mobilePublishedIds?.some((spec: { spec_id: number }) => spec.spec_id === selectedSpecId) ||
            desktopPublishedIds?.some((spec: { spec_id: number }) => spec.spec_id === selectedSpecId));

        return isPublished ? "published" : "draft";
      } catch (error) {
        console.error("Error fetching published IDs:", error);
      }
    };

    fetchPublishedIds();
  }, [mobileConfig, desktopConfig]);

  useEffect(() => {
    const initialData: DataType[] =
      moduleGroupSpecs?.map((spec) => {
        const moduleSpec = moduleSpecs?.find((s) => s.module_spec_id === spec.module_spec_id);
        const currentPosition = specsPositions?.find((pos) => pos.module_group_spec_module_specs_id === Number(spec.id))?.current_position;
        return {
          key: spec.id,
          name: moduleSpec?.name || "",
          current_position: currentPosition !== undefined ? currentPosition : -1, // Default to -1 if not found
          disabled: spec.disabled,
        };
      }) || [];

    // Sort initialData based on current_position
    initialData.sort((a, b) => a.current_position - b.current_position);

    setData([...initialData]);
  }, [moduleGroupSpecs, moduleSpecs, specsPositions]);

  const [data, setData] = useState<DataType[]>([]);

  if (isLoading) return isLoading && <Skeleton active />;
  if (error) return <div>Failed to load module specs</div>;

  const { confirm } = Modal;
  const showDeleteConfirm = (spec: DataType) => {
    console.log(spec);
    confirm({
      title: `Delete ${spec.name}?`,
      icon: <ExclamationCircleFilled />,
      content: "This will delete the module spec and all the configuration",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteModuleSpec(Number(spec.key));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const updatedData = Array.from(data);
    const [movedRow] = updatedData.splice(source.index, 1);
    updatedData.splice(destination.index, 0, movedRow);

    setData(updatedData);

    // Prepare the payload for the API call
    const payload = updatedData.map((item, index) => ({
      module_group_spec_module_specs_id: Number(item.key),
      module_group_spec_id: id,
      current_position: index,
    }));
    console.log("payload", payload);

    // Call the API to update the positions
    updateSpecsPositions(id, payload);
  };

  const handleDisabled = (record: DataType) => {
    const moduleSpec = moduleGroupSpecs?.find((spec) => spec.id === record.key);
    if (moduleSpec) {
      updateModuleSpec({ ...moduleSpec, disabled: !record.disabled });
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "drag",
      key: "drag",
      width: 30,
      render: (_: any, __: any, index: number) => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <Space>
          Mobile <MobileOutlined />
        </Space>
      ),
      dataIndex: "mobile",
      key: "mobile",
      className: "min-width",
      onCell: (record: DataType) => ({
        onClick: () => {
          showMobileDrawer(Number(record.key), record.name);
          setIsMobileLayout(true);
        },
      }),
      render: (_: any, __: any, index: number) => (
        <TextCss>
          <Space>
            Edit
            <EditOutlined />
          </Space>
        </TextCss>
      ),
    },
    {
      title: (
        <Space>
          Status <MobileOutlined />
        </Space>
      ),
      dataIndex: "status",
      key: "status",
      render: (_: any, record: DataType) => {
        const isPublished = mobilePublishedIds.includes(Number(record.key ?? 0));
        return <TableStatusTag variant={isPublished ? "published" : "draft"}>{isPublished ? "Published" : "Draft"}</TableStatusTag>;
      },
    },
    {
      title: (
        <Space>
          Desktop <DesktopOutlined />
        </Space>
      ),
      dataIndex: "desktop",
      key: "desktop",
      className: "min-width",
      onCell: (record: DataType) => ({
        onClick: () => {
          showDesktopDrawer(Number(record.key), record.name);
          setIsMobileLayout(false);
        },
      }),
      render: (_: any, __: any, index: number) => (
        <TextCss>
          <Space>
            Edit
            <EditOutlined />
          </Space>
        </TextCss>
      ),
    },
    {
      title: (
        <Space>
          Status <DesktopOutlined />
        </Space>
      ),
      dataIndex: "status",
      key: "status",
      render: (_: any, record: DataType) => {
        const isPublished = desktopPublishedIds.includes(Number(record.key ?? 0));
        return <TableStatusTag variant={isPublished ? "published" : "draft"}>{isPublished ? "Published" : "Draft"}</TableStatusTag>;
      },
    },
    {
      title: "Disabled",
      dataIndex: "disabled",
      key: "disabled",
      className: "allow-events",

      render: (_: any, record: any, index: number) => (
        <TextCss>
          {record.disabled ? <EyeInvisibleOutlined onClick={() => handleDisabled(record)} /> : <EyeOutlined onClick={() => handleDisabled(record)} />}
        </TextCss>
      ),
    },
  ];

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = restProps["data-row-key"];
    const rowIndex = data.findIndex((item) => item.key === index);
    if (rowIndex === -1) {
      return <tr {...restProps} />;
    }

    return (
      <Draggable key={data[rowIndex].key} draggableId={String(data[rowIndex].key)} index={rowIndex}>
        {(provided, snapshot) => (
          <TableRow
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${className} ${snapshot.isDragging ? "dragging" : ""} ${data[rowIndex].disabled ? "dissabled-row" : ""} `}
            style={{ ...style, ...provided.draggableProps.style }}
          >
            <td {...provided.dragHandleProps}>
              <MenuOutlined style={{ cursor: "grab", color: "#999", padding: "8px" }} />
            </td>

            <FlexEndContainer>
              {restProps.children.slice(1)}
              <Button
                type="primary"
                onClick={() => {
                  showDeleteConfirm(data[rowIndex]);
                }}
              >
                <DeleteOutlined />
              </Button>
            </FlexEndContainer>
          </TableRow>
        )}
      </Draggable>
    );
  };

  return (
    <StyledTable>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="table-body" direction="vertical">
          {(provided) => (
            <Table
              columns={columns}
              dataSource={data}
              components={{
                body: {
                  wrapper: (props: any) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {props.children}
                      {provided.placeholder}
                    </tbody>
                  ),
                  row: DraggableBodyRow,
                },
              }}
              rowKey="key"
              pagination={false}
              sticky
              rowClassName={(record) => (record.disabled ? "disabled-row" : "")}
            />
          )}
        </Droppable>
      </DragDropContext>
    </StyledTable>
  );
};

export default DraggableTable;

const StyledTable = styled.div`
  .ant-table-cell {
    padding: 0 !important;
    width: 100%;
    display: flex;
    justify-content: center;
    :first-child {
      justify-content: start;
    }
  }
  .disabled-row {
    opacity: 0.3 !important;
    pointer-events: none;
    .allow-events {
      pointer-events: initial;
    }
  }
  .ant-table-tbody > tr {
    cursor: grab;
  }
  .ant-table-thead > tr > th:first-child {
    width: 35px;
    height: 43px;
    padding-right: 2rem;
  }
  th.ant-table-cell {
    padding: 10px !important;
    display: flex;
    justify-content: center;
    :not(:nth-child(2)) {
      flex-shrink: 2;
    }
  }
  //Name
  th.ant-table-cell:nth-child(2) {
    justify-content: start;
  }
  tr.dragging {
    background: ${(p) => p.theme.colors.gray100};
  }

  tr {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.colors.gray200};

  td:not(:first-child) {
    flex-shrink: 2;
    min-width: 85px;
  }

  :hover {
    background: ${(p) => p.theme.colors.gray100};
  }
  .min-width > span {
    min-width: 85px;
    text-align: center;
  }
  button {
    display: none;
    box-shadow: none;
    z-index: 100;
    position: absolute;
    right: 0;
  }

  :hover {
    button {
      display: inline-flex;
      background: transparent !important;
      color: ${(p) => p.theme.colors.gray600};
      :hover {
        color: red !important;
      }
    }
  }
`;

const FlexEndContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: end;
`;

const TextCss = styled.span`
  color: ${(p) => p.theme.colors.primary500};
  padding: 10px;
  cursor: pointer;
`;
