import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  MenuOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { usePathname } from "next/navigation";
import { ModuleSpec } from "@/app/data/typings";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-group-specs";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";

interface DataType {
  key: string;
  name: string;
}
const DraggableTable: React.FC = () => {
  const { openDrawer } = useDrawerContext();
  const { allModuleSpecs } = useModuleGroupProvider();
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const { isLoading, error, moduleGroupSpecs } = useModuleGroupSpecs(id);

  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>(
    []
  );

  useEffect(() => {
    if (moduleGroupSpecs) {
      setSelectedModuleSpecs(moduleGroupSpecs);
    } else {
      console.error("Failed to fetch module group specs:", moduleGroupSpecs);
    }
  }, [moduleGroupSpecs]);

  useEffect(() => {
    const initialData: DataType[] = selectedModuleSpecs.map((spec) => {
      const moduleSpec = allModuleSpecs.find(
        (s) => s.module_spec_id === spec.module_spec_id
      );
      return {
        key: spec.id,
        name: moduleSpec?.name || "",
      };
    });

    setData([...initialData]);
  }, [selectedModuleSpecs]);

  const [data, setData] = useState<DataType[]>([]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load module specs</div>;

  const { deleteModuleSpec } = useModuleGroupSpecs(id);

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
    console.log("updatedData", updatedData);
    console.log("data", data);
  };

  const columns = [
    {
      title: "",
      dataIndex: "drag",
      key: "drag",
      width: 30,
      render: (_: any, __: any, index: number) => (
        <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onCell: (record: DataType) => ({
        onClick: () => {
          openDrawer(record.name);
        },
      }),
    },
  ];

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = restProps["data-row-key"];
    const rowIndex = data.findIndex((item) => item.key === index);
    if (rowIndex === -1) {
      return <tr {...restProps} />;
    }

    return (
      <Draggable
        key={data[rowIndex].key}
        draggableId={String(data[rowIndex].key)}
        index={rowIndex}
      >
        {(provided, snapshot) => (
          <TableRow
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${className} ${snapshot.isDragging ? "dragging" : ""}`}
            style={{ ...style, ...provided.draggableProps.style }}
          >
            <td {...provided.dragHandleProps}>
              <MenuOutlined
                style={{ cursor: "grab", color: "#999", padding: "8px" }}
              />
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
    padding: 10px !important;
    width: 100%;
  }
  .ant-table-tbody {
    display: flex;
  }
  .ant-table-tbody > tr {
    cursor: grab;
  }
  .ant-table-thead > tr {
    background: ${(p) => p.theme.colors.gray100};
  }
  .ant-table-thead > tr > th:nth-child(1) {
    width: 35px;
    height: 43px;
    background: ${(p) => p.theme.colors.gray100};
  }
  .ant-table-thead > tr > th:nth-child(2) {
    width: 100%;
    background: ${(p) => p.theme.colors.gray100};
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
  :hover {
    background: ${(p) => p.theme.colors.gray100};
    cursor: pointer;
  }

  button {
    display: none;
    box-shadow: none;
    z-index: 100;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
