import { Row, Col, Radio, CheckboxProps, Select } from "antd";
import React, { use, useState } from "react";
import { StyledFormItem } from "../DrawerDesktopContent";
import LayoutPreview from "./LayoutPreview";

type DesktopLayoutConfigurationProps = {
  isContainer: boolean;
  title?: string;
};

const DesktopLayoutConfiguration = ({ isContainer, title }: DesktopLayoutConfigurationProps) => {
  const [selectedWebColumns, setSelectedWebColumns] = useState<number>(1);
  const [selectedWebLayout, setSelectedWebLayout] = useState("3/3");
  const [selectedWebRows, setSelectedWebRows] = useState<number>(1);
  const { Option } = Select;

  const handleColumnsChange = (value: number) => {
    console.log(value);
    setSelectedWebColumns(value);
  };
  const handleRowsChange = (value: number) => {
    setSelectedWebRows(value);
  };

  const layoutOptions = [
    { label: "1/3", value: "1/3" }, //mobile has only 1 column layout
    { label: "2/3", value: "2/3" },
    { label: "3/3", value: "3/3" },
  ];

  const handleLayoutChange: CheckboxProps["onChange"] = (e) => {
    console.log(e.target.value);
    setSelectedWebLayout(e.target.value);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <StyledFormItem label={"Screen size"}>
            <Radio.Group
              block
              options={layoutOptions}
              defaultValue="3/3"
              optionType="button"
              onChange={handleLayoutChange}
              value={selectedWebLayout}
            />
          </StyledFormItem>
        </Col>
      </Row>
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
        selectedLayout={selectedWebLayout}
        numberOfColumns={selectedWebColumns}
        numberOfRows={selectedWebRows}
        isContainer={isContainer}
        title={title}
      />
    </>
  );
};

export default DesktopLayoutConfiguration;
