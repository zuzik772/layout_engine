import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { StyledFormItem } from "../DrawerDesktopContent";

interface LayoutPreviewProps {
  selectedLayout?: string;
  numberOfColumns: number;
  numberOfRows: number;
  isContainer: boolean;
  title?: string;
}

const LayoutPreview = ({ selectedLayout, numberOfColumns, numberOfRows, isContainer, title }: LayoutPreviewProps) => {
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
    <StyledFormItem label={"Layout Preview"}>
      <WrapperCss>
        {selectedLayout && (
          <LayoutPreviewCss selectedLayout={selectedLayout} span={getLayoutSpan()} isContainer={isContainer}>
            <TitlePreview>{title}</TitlePreview>
            {/* Nested Grid for Columns and Rows */}
            <InternalGrid numberOfColumns={numberOfColumns} numberOfRows={numberOfRows}>
              {Array.from({ length: numberOfColumns * numberOfRows }).map((_, index) => (
                <GridCell key={index}>
                  {/* C{Math.floor(index / numberOfColumns) + 1}R
                      {(index % numberOfRows) + 1} */}
                </GridCell>
              ))}
            </InternalGrid>
          </LayoutPreviewCss>
        )}
      </WrapperCss>
    </StyledFormItem>
  );
};

export default LayoutPreview;

export const LayoutPreviewCss = styled.div<{
  selectedLayout: string;
  span: number;
  isContainer: boolean;
}>`
  min-height: 50px;
  height: 100%;
  width: ${({ span }) => (span / 24) * 100}%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ isContainer }) => (isContainer ? " 1px solid #b4b4b4;" : "none")};
  padding: 12px;
  background-color: ${({ isContainer }) => (isContainer ? "#f0f0f0" : "transparent")};
  p {
    place-self: start;
    padding-bottom: 12px;
  }
`;

export const WrapperCss = styled.div`
  display: flex;
  div {
    border-radius: 8px;
  }
`;

export const InternalGrid = styled.div<{
  numberOfColumns: number;
  numberOfRows: number;
}>`
  display: grid;
  grid-template-columns: repeat(${({ numberOfColumns }) => numberOfColumns}, 1fr);
  grid-template-rows: repeat(${({ numberOfRows }) => numberOfRows}, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
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
`;
