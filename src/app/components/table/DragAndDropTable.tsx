import React, { useEffect, useState } from "react";
import { Button, Modal, Skeleton, Table } from "antd";
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
import { useModuleSpecs } from "@/app/hooks/use-module-specs";
import { useSpecsPositions } from "@/app/hooks/use-specs-positions";

interface DataType {
  key: string;
  name: string;
  current_position: number;
}
const DraggableTable: React.FC = () => {
  const { openDrawer } = useDrawerContext();
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const { isLoading, error, moduleGroupSpecs, deleteModuleSpec } =
    useModuleGroupSpecs(id);
  const { moduleSpecs } = useModuleSpecs();
  const { specsPositions, updateSpecsPositions } = useSpecsPositions(id);

  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>(
    []
  );

  useEffect(() => {
    moduleGroupSpecs && setSelectedModuleSpecs(moduleGroupSpecs);
  }, [moduleGroupSpecs]);

  useEffect(() => {
    const initialData: DataType[] = selectedModuleSpecs.map((spec) => {
      const moduleSpec = moduleSpecs?.find(
        (s) => s.module_spec_id === spec.module_spec_id
      );

      const currentPosition = specsPositions?.find(
        (pos) => pos.module_group_spec_module_specs_id === Number(spec.id)
      )?.current_position;
      return {
        key: spec.id,
        name: moduleSpec?.name || "",
        current_position: currentPosition !== undefined ? currentPosition : -1, // Default to -1 if not found
      };
    });

    // Sort initialData based on current_position
    initialData.sort((a, b) => a.current_position - b.current_position);

    setData([...initialData]);
  }, [selectedModuleSpecs, moduleSpecs, specsPositions]);

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
    updateSpecsPositions(payload);
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
      title: "#",
      dataIndex: "order",
      key: "order",
      width: 30,
      render: (_: any, __: any, index: number) => String(index + 1) + ".",
    },
    {
      title: "Module Spec Name",
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
    padding: 10px 0 !important;
    width: 100%;
  }

  table {
    display: block;
  }

  tbody {
    display: flex;
    flex-direction: column;
  }

  .ant-table-tbody > tr {
    cursor: grab;
  }
  .ant-table-thead {
    display: block;
  }

  .ant-table-thead > tr > th:nth-child(1),
  .ant-table-thead > tr > th:nth-child(2) {
    width: 35px;
    height: 43px;
    text-align: center;
  }
  .ant-table-thead > tr > th:nth-child(3) {
    width: 100%;
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
  flex-grow: 1;
  align-items: center;

  td:first-child {
    width: 35px;
    text-align: center;
    font-weight: 600;
  }
`;
