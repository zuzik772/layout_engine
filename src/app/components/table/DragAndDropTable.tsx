import React, { useEffect, useState } from "react";
import { Button, Modal, Skeleton, Table } from "antd";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { usePathname } from "next/navigation";
import { ModuleSpec } from "@/app/data/typings";
import { getModuleGroupSpecs } from "@/app/api/module-group-specs/api";

interface DataType {
  key: string;
  name: string;
}
const DraggableTable: React.FC = () => {
  const { openDrawer } = useDrawerContext();

  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>(
    []
  );

  useEffect(() => {
    getModuleGroupSpecs(id).then((data) => {
      setSelectedModuleSpecs(data);
    });
  }, []);

  useEffect(() => {
    const initialData: DataType[] = selectedModuleSpecs.map((spec) => ({
      key: spec.id,
      name: spec.name,
    }));

    setData([...initialData]);
  }, [selectedModuleSpecs]);

  const [data, setData] = useState<DataType[]>([]);
  console.log("data", data);
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
                  Modal.confirm({
                    title: `Delete ${data[rowIndex].name}`,
                    content:
                      "This will delete the module spec and all the configuration",
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
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
