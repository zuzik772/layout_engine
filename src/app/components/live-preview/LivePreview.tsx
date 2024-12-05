import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";

interface LivePreviewProps {
  layout: Array<{
    selectableLayout: string;
    numberOfColumns: number;
    numberOfRows: number;
    title: string;
    isContainer: boolean;
  }>;
}

const LivePreview = ({ layout }: LivePreviewProps) => {
  const renderNestedGrid = (numCols: number, numRows: number) => (
    <NestedGrid numberOfColumns={numCols} numberOfRows={numRows}>
      {Array.from({ length: numCols * numRows }).map((_, index) => (
        <GridCell key={index}>
          C{Math.floor(index / numCols) + 1}R{(index % numCols) + 1}
        </GridCell>
      ))}
    </NestedGrid>
  );

  const getLayoutSpan = (layout: string) => {
    switch (layout) {
      case "1/3":
        return 8; // 1/3 of a 24-column grid
      case "2/3":
        return 16; // 2/3 of a 24-column grid
      case "3/3":
      default:
        return 24; // Full width
    }
  };

  return (
    <WrapperCss>
      <Row gutter={[16, 16]}>
        {/* Render dynamic columns with nested grids */}
        {layout.map((item, index) => {
          const span = getLayoutSpan(item.selectableLayout);
          const isContainer = item.isContainer;

          return (
            <Col span={span} key={index}>
              <LivePreviewCss isContainer={isContainer}>
                {item.title && <TitlePreview>{item.title}</TitlePreview>}
                {renderNestedGrid(item.numberOfColumns, item.numberOfRows)}
              </LivePreviewCss>
            </Col>
          );
        })}
      </Row>
    </WrapperCss>
  );
};

export default LivePreview;

export const LivePreviewCss = styled.div<{ isContainer: boolean }>`
  min-height: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ isContainer }) => (isContainer ? "1px solid #b4b4b4;" : "none")};
  padding: 12px;
  background: ${({ isContainer }) => (isContainer ? "#f0f0f0" : "transparent")};
  overflow: hidden;
`;

export const WrapperCss = styled.div`
  display: flex;
  flex-direction: column;
  div {
    border-radius: 8px;
  }
`;

export const NestedGrid = styled.div<{ numberOfColumns: number; numberOfRows: number }>`
  display: grid;
  grid-template-columns: repeat(${({ numberOfColumns }) => numberOfColumns}, 1fr);
  grid-template-rows: repeat(${({ numberOfRows }) => numberOfRows}, auto);
  gap: 8px;
  width: 100%;
`;

export const GridCell = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  border: 1px solid #b4b4b4;
  font-size: 12px;
  color: #333;
`;

export const TitlePreview = styled.p`
  text-align: start;
  margin-bottom: 8px;
  font-weight: bold;
`;
