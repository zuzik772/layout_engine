import React from "react";
import styled from "styled-components";
import { Row, Col, Empty } from "antd";
import { DesktopLayoutConfig, MobileLayoutConfig } from "@/app/data/typings";

const LivePreview = ({ layoutConfig }: { layoutConfig: MobileLayoutConfig[] | DesktopLayoutConfig[] }) => {
  if (!Array.isArray(layoutConfig)) {
    return null;
  }
  console.log(layoutConfig);
  const getLayoutSpan = (layout_option: string) => {
    switch (layout_option) {
      case "1/3":
        return 8; // 1/3 of a 24-column grid
      case "2/3":
        return 16; // 2/3 of a 24-column grid
      case "3/3":
      default:
        return 24; // Full width
    }
  };
  const isDesktopLayoutConfig = (item: any): item is DesktopLayoutConfig => {
    return (item as DesktopLayoutConfig).layout_option !== undefined;
  };
  return (
    <WrapperCss>
      {layoutConfig.length === 0 ? (
        <Empty description="Layout configuration not found" />
      ) : (
        <Row gutter={[16, 16]}>
          {layoutConfig.map((item, index) => {
            const span = isDesktopLayoutConfig(item) ? getLayoutSpan(item.layout_option ?? "3/3") : 24;

            return (
              <Col span={span} key={index}>
                <LivePreviewCss isContainer={item.boxed ?? false}>
                  <TitlePreview>{item.title}</TitlePreview>
                  <NestedGrid numberOfColumns={item.columns ?? 1} numberOfRows={item.rows ?? 1}>
                    {Array.from({ length: item.columns ?? 1 * (item.rows ?? 1) }).map((_, index) => (
                      <GridCell key={index} />
                    ))}
                  </NestedGrid>
                </LivePreviewCss>
              </Col>
            );
          })}
        </Row>
      )}
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
