import { Row, Col, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { StyledFormItem } from "../DrawerDesktopContent";
import { GridCell, InternalGrid, LayoutPreviewCss, TitlePreview, WrapperCss } from "./LayoutPreview";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { useMobileLayoutConfig } from "@/app/hooks/use-mobile-layout-config";

type MobileLayoutConfigurationProps = {
  isContainer: boolean;
  title?: string;
};

const MobileLayoutConfiguration = ({ isContainer, title }: MobileLayoutConfigurationProps) => {
  const { selectedSpecId, mobileLayoutConfig, setMobileLayoutConfig } = useDrawerContext();
  const { mobileConfig, isLoading } = useMobileLayoutConfig(selectedSpecId);
  const selectedMobileConfig = Array.isArray(mobileConfig) ? mobileConfig[0] : mobileConfig;
  const selectedMobileColumns = selectedMobileConfig?.columns ?? 1;
  const selectedMobileRows = selectedMobileConfig?.rows ?? 1;

  const [columns, setColumns] = useState(selectedMobileColumns?.columns ?? 1);
  const [rows, setRows] = useState(selectedMobileRows?.rows ?? 1);
  const { Option } = Select;

  useEffect(() => {
    if (mobileConfig) {
      setMobileLayoutConfig(selectedMobileConfig);
      setColumns(selectedMobileConfig?.columns ?? 1);
      setRows(selectedMobileConfig?.rows ?? 1);
    }
  }, [mobileConfig, selectedMobileConfig, selectedSpecId]);

  const handleColumnsChange = (value: number) => {
    setColumns(value);
    selectedSpecId &&
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        spec_id: selectedSpecId,
        columns: value,
      });
  };
  const handleRowsChange = (value: number) => {
    setRows(value);
    selectedSpecId &&
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        spec_id: selectedSpecId,
        rows: value,
      });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <StyledFormItem name="columns" label="Columns">
                <Select value={columns} onChange={handleColumnsChange}>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                    <Option key={i} value={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              </StyledFormItem>
            </Col>
            <Col span={12}>
              <StyledFormItem name="rows" label="Rows">
                <Select value={rows} onChange={handleRowsChange}>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                    <Option key={i} value={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              </StyledFormItem>
            </Col>
          </Row>

          <StyledFormItem label={"Layout Preview"}>
            <WrapperCss>
              <LayoutPreviewCss selectedLayout="3/3" span={24} isContainer={isContainer}>
                <TitlePreview>{title}</TitlePreview>
                {/* Nested Grid for Columns and Rows */}
                <InternalGrid numberOfColumns={columns} numberOfRows={rows}>
                  {Array.from({ length: columns * rows }).map((_, index) => (
                    <GridCell key={index}>
                      {/* C{Math.floor(index / numberOfColumns) + 1}R
                      {(index % numberOfRows) + 1} */}
                    </GridCell>
                  ))}
                </InternalGrid>
              </LayoutPreviewCss>
            </WrapperCss>
          </StyledFormItem>
        </>
      )}
    </>
  );
};

export default MobileLayoutConfiguration;
