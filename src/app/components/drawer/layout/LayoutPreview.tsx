import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { StyledFormItem } from "../DrawerContent";

interface LayoutPreviewProps {
  selectedLayout: string;
  numberOfColumns: number;
  numberOfRows: number;
  isMobileContainer: boolean;
}

const LayoutPreview = ({ selectedLayout, numberOfColumns, numberOfRows, isMobileContainer }: LayoutPreviewProps) => {
  // Determines the span width based on the selected layout (1/3, 2/3, 3/3)
  const getLayoutSpan = () => {
    switch (selectedLayout) {
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
    <Row>
      <Col span={24}>
        <StyledFormItem label={"Layout Preview"}>
          <WrapperCss>
            <LayoutPreviewCss selectedLayout={selectedLayout} span={getLayoutSpan()} isMobileContainer={isMobileContainer}>
              {/* Nested Grid for Columns and Rows */}
              <InternalGrid numberOfColumns={numberOfColumns} numberOfRows={numberOfRows}>
                {Array.from({ length: numberOfColumns * numberOfRows }).map((_, index) => (
                  <GridCell key={index}>
                    R{Math.floor(index / numberOfRows) + 1}C{(index % numberOfRows) + 1}
                  </GridCell>
                ))}
              </InternalGrid>
            </LayoutPreviewCss>
          </WrapperCss>
        </StyledFormItem>
      </Col>
    </Row>
  );
};

export default LayoutPreview;

const LayoutPreviewCss = styled.div<{ selectedLayout: string; span: number; isMobileContainer: boolean }>`
  min-height: 50px;
  height: 100%;
  width: ${({ span }) => (span / 24) * 100}%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ isMobileContainer }) => (isMobileContainer ? " 1px solid #b4b4b4;" : "none")};
  padding: 12px;
  background-color: ${({ isMobileContainer }) => (isMobileContainer ? "#f0f0f0" : "transparent")};
`;

const WrapperCss = styled.div`
  display: flex;
  div {
    border-radius: 8px;
  }
`;

const InternalGrid = styled.div<{ numberOfColumns: number; numberOfRows: number }>`
  display: grid;
  grid-template-columns: repeat(${({ numberOfColumns }) => numberOfColumns}, 1fr);
  grid-template-rows: repeat(${({ numberOfRows }) => numberOfRows}, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
`;

const GridCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  border: 1px solid #b4b4b4;
  font-size: 12px;
  color: #333;
`;
