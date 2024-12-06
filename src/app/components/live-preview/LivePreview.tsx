import React, { use, useState } from "react";
import styled from "styled-components";
import { Row, Col, Empty } from "antd";
import { DesktopLayoutConfig, MobileLayoutConfig } from "@/app/data/typings";
import { useSpecsPositions } from "@/app/hooks/use-specs-positions";
import { usePathname } from "next/navigation";

const LivePreview = ({ layoutConfig }: { layoutConfig: MobileLayoutConfig | DesktopLayoutConfig }) => {
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);
  const { specsPositions } = useSpecsPositions(id);
  console.log("whats specsPositions", specsPositions);
  const [sortedPositions, setSortedPositions] = useState<number[]>([]);
  if (!Array.isArray(layoutConfig)) {
    return null;
  }

  let sortedLayoutConfig = [];
  if (specsPositions && specsPositions.length > 0) {
    const filteredLayoutConfig = layoutConfig.filter((config) =>
      specsPositions.some((position) => position.module_group_specs_id === config.spec_id)
    );

    console.log("whats filteredLayoutConfig", filteredLayoutConfig);

    // Find current_position for filteredLayoutConfig and sort them
    const sortedPositions = filteredLayoutConfig
      .map((config) => {
        const position = specsPositions.find((position) => position.module_group_specs_id === config.spec_id);
        return { ...config, current_position: position?.current_position ?? -1 };
      })
      .sort((a, b) => a.current_position - b.current_position);

    sortedLayoutConfig = sortedPositions;
  } else {
    sortedLayoutConfig = layoutConfig;
  }

  console.log("whats layoutConfig", layoutConfig);
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

  return (
    <WrapperCss>
      {layoutConfig.length === 0 ? (
        <Empty description="Layout configuration not found" />
      ) : (
        <Row gutter={[16, 16]}>
          {sortedLayoutConfig.map((item, index) => {
            const span = getLayoutSpan(item.layout_option ?? "3/3");

            return (
              <Col span={span} key={index}>
                <LivePreviewCss isContainer={item.boxed ?? false}>
                  <TitlePreview>{item.title}</TitlePreview>
                  <NestedGrid numberOfColumns={item.columns} numberOfRows={item.rows}>
                    {Array.from({ length: item.columns * item.rows }).map((_, index) => (
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
