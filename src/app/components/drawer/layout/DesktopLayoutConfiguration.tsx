import { Row, Col, Radio, CheckboxProps, Select } from "antd";
import React, { useState } from "react";
import { StyledFormItem } from "../DrawerDesktopContent";
import LayoutPreview from "./LayoutPreview";

type DesktopLayoutConfigurationProps = {
  isMobileContainer: boolean;
  title?: string;
};

const DesktopLayoutConfiguration = ({
  isMobileContainer,
  title,
}: DesktopLayoutConfigurationProps) => {
  // State for mobile and web columns
  const [selectedWebColumns, setSelectedWebColumns] = useState<number>(1);

  // State for mobile and web rows
  const [selectedWebRows, setSelectedWebRows] = useState<number>(1);
  const { Option } = Select;

  const handleColumnsChange = (value: number) => {
    setSelectedWebColumns(value);
  };
  const handleRowsChange = (value: number) => {
    setSelectedWebRows(value);
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <StyledFormItem label={"Columns"}>
            <Select value={selectedWebColumns} onChange={handleColumnsChange}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                <Option key={i} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label={"Rows"}>
            <Select value={selectedWebRows} onChange={handleRowsChange}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                <Option key={i} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </StyledFormItem>
        </Col>
      </Row>
      <LayoutPreview
        selectedLayout={"3/3"}
        numberOfColumns={selectedWebColumns}
        numberOfRows={selectedWebRows}
        isMobileContainer={isMobileContainer}
        title={title}
      />
    </>
  );
};

export default DesktopLayoutConfiguration;
