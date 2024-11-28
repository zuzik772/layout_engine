import { Row, Col, Radio, CheckboxProps, Select } from "antd";
import React, { useEffect, useState } from "react";
import { StyledFormItem } from "../DrawerDesktopContent";
import LayoutPreview from "./LayoutPreview";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { useDesktopLayoutConfig } from "@/app/hooks/use-desktop-layout-config";

type DesktopLayoutConfigurationProps = {
  isContainer: boolean;
  title?: string;
};

const DesktopLayoutConfiguration = ({ isContainer, title }: DesktopLayoutConfigurationProps) => {
  const { selectedSpecId, desktopLayoutConfig, setDesktopLayoutConfig } = useDrawerContext();
  const { desktopConfig, isLoading } = useDesktopLayoutConfig(selectedSpecId);
  const [selectedWebColumns, setSelectedWebColumns] = useState<number>(1);
  const [selectedWebLayout, setSelectedWebLayout] = useState("3/3");
  const [selectedWebRows, setSelectedWebRows] = useState<number>(1);
  const { Option } = Select;

  const selectedDesktopConfig = Array.isArray(desktopConfig) ? desktopConfig[0] : desktopConfig;
  const selectedDesktopColumns = selectedDesktopConfig?.columns ?? 1;
  const selectedMobileRows = selectedDesktopConfig?.rows ?? 1;

  const [columns, setColumns] = useState(selectedDesktopColumns?.columns ?? 1);
  const [rows, setRows] = useState(selectedMobileRows?.rows ?? 1);

  useEffect(() => {
    if (desktopConfig) {
      setDesktopLayoutConfig(selectedDesktopConfig);
      setColumns(selectedDesktopConfig?.columns ?? 1);
      setRows(selectedDesktopConfig?.rows ?? 1);
    }
  }, [desktopConfig, selectedDesktopConfig, selectedSpecId]);

  const handleColumnsChange = (value: number) => {
    setColumns(value);
    selectedSpecId &&
      setDesktopLayoutConfig({
        ...desktopLayoutConfig,
        spec_id: selectedSpecId,
        columns: value,
      });
  };
  const handleRowsChange = (value: number) => {
    setRows(value);
    selectedSpecId &&
      setDesktopLayoutConfig({
        ...desktopLayoutConfig,
        spec_id: selectedSpecId,
        rows: value,
      });
  };
  const handleLayoutChange: CheckboxProps["onChange"] = (e) => {
    console.log(e.target.value);
    setSelectedWebLayout(e.target.value);
  };

  const layoutOptions = [
    { label: "1/3", value: "1/3" }, //mobile has only 1 column layout
    { label: "2/3", value: "2/3" },
    { label: "3/3", value: "3/3" },
  ];
  console.log("number of columns, rows", columns, rows);
  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <StyledFormItem name="layout_option" label={"Screen size"}>
            <Radio.Group
              block
              options={layoutOptions}
              defaultValue={selectedWebLayout}
              optionType="button"
              onChange={handleLayoutChange}
              value={selectedWebLayout}
            />
          </StyledFormItem>
        </Col>
      </Row>
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
      <LayoutPreview selectedLayout={selectedWebLayout} numberOfColumns={columns} numberOfRows={rows} isContainer={isContainer} title={title} />
    </>
  );
};

export default DesktopLayoutConfiguration;
