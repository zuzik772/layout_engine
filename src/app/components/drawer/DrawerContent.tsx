import { Form, Row, Col, Input, Select, Radio } from "antd";
import React, { useState } from "react";
import type { CheckboxProps } from "antd";
import styled from "styled-components";
import ContainerMode from "./ContainerMode";

const DrawerContent = () => {
  const [isMobileLayout, setIsMobileLayout] = useState(true);
  const [isMobileContainer, setIsMobileContainer] = useState(false);
  const [isWebContainer, setIsWebContainer] = useState(false);

  const [selectedLayout, setSelectedLayout] = useState("3/3");

  const { Option } = Select;

  const options = [
    { label: "Mobile", value: "Mobile" },
    { label: "Web", value: "Web" },
  ];

  const layoutOptions = [
    { label: "1/3", value: "1/3" },
    { label: "2/3", value: "2/3" },
    { label: "3/3", value: "3/3" },
  ];
  const handleContainerModeChange: CheckboxProps["onChange"] = (e) => {
    const value = e.target.value;
    setIsMobileLayout(value === "Mobile");
  };

  const handleLayoutChange: CheckboxProps["onChange"] = (e) => {
    setSelectedLayout(e.target.value);
  };

  const getColumnIndices = () => {
    switch (selectedLayout) {
      case "1/3":
        return [1, 2, 3];
      case "2/3":
        return [1, 2, 3];
      case "3/3":
        return [3];
      default:
        return [];
    }
  };
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <StyledFormItem
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Please enter title" />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem
            name="type"
            label="Module type / Game collection"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Select placeholder="Please choose the type">
              <Option value="all">All Games</Option>
              <Option value="favourites">Favourites</Option>
            </Select>
          </StyledFormItem>
        </Col>
      </Row>

      <SectionTitle>Customized layout settings</SectionTitle>
      <Row gutter={16}>
        <Col span={24}>
          <StyledFormItem>
            {/* Equivalent to 1/3 (mobile),2 column (tablet - DEPRECATED), 3 column (web) attribute */}
            <Radio.Group
              block
              options={options}
              defaultValue="Mobile"
              optionType="button"
              buttonStyle="solid"
              onChange={handleContainerModeChange}
            />
          </StyledFormItem>
        </Col>
      </Row>
      {/* Equivalent to Boxed attribute */}
      {isMobileLayout ? (
        <ContainerMode
          isChecked={isMobileContainer}
          onChange={(e) => setIsMobileContainer(e.target.checked)}
        />
      ) : (
        <ContainerMode
          isChecked={isWebContainer}
          onChange={(e) => setIsWebContainer(e.target.checked)}
        />
      )}

      {/* Equivalent to fillColumns attribute */}
      <Row gutter={16}>
        <Col span={24}>
          <StyledFormItem label="Choose layout">
            <Radio.Group
              block
              options={layoutOptions}
              defaultValue="3/3"
              optionType="button"
              buttonStyle="solid"
              onChange={handleLayoutChange}
              value={selectedLayout}
            />
          </StyledFormItem>
        </Col>
      </Row>
      <StyledRow selectedLayout={selectedLayout}>
        <Col span={24}>
          <StyledFormItem label={"Layout Preview"}>
            <WrapperCss>
              {getColumnIndices().map((index) => (
                <LayoutPreviewCss
                  key={index}
                  selectedLayout={selectedLayout}
                  index={index}
                >
                  {index === 3 ? (
                    <p>Full screen layout</p>
                  ) : (
                    <p>{index}/3 layout</p>
                  )}
                </LayoutPreviewCss>
              ))}
            </WrapperCss>
          </StyledFormItem>
        </Col>
      </StyledRow>

      {/* Equivalent to Columns options (1-8) */}
      <Row gutter={16}>
        <Col span={8}>
          <StyledFormItem
            name="columns"
            label="Columns"
            rules={[
              {
                required: true,
                message: "Please choose the number of columns",
              },
            ]}
          >
            <Select placeholder="Please choose the number of columns">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
            </Select>
          </StyledFormItem>
        </Col>
        <Col span={8}>
          <StyledFormItem
            name="rows"
            label="Rows"
            rules={[
              {
                required: true,
                message: "Please choose the number of Rows",
              },
            ]}
          >
            <Select placeholder="Please choose the number of rows">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
            </Select>
          </StyledFormItem>
        </Col>
      </Row>

      {/* Equivalent to Rows options (1-8) */}
    </Form>
  );
};

export default DrawerContent;

const SectionTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
`;

const ContainerPreview = styled.div`
  padding: 10px;
  border-radius: 12px;
`;

export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    font-weight: 500;
  }
`;

const StyledRow = styled(Row)<{ selectedLayout: string }>`
  .ant-radio-button-wrapper {
    background-color: ${(props) => {
      switch (props.selectedLayout) {
        case "1/3":
          return "100%";
        case "2/3":
          return "66.67%";
        case "3/3":
          return "33.33%";
        default:
          return "33.33%";
      }
    }};
  }
`;

const WrapperCss = styled.div`
  display: flex;
  div:first-child {
    border-radius: 8px 0 0 8px;
  }

  div:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

const LayoutPreviewCss = styled.div<{ selectedLayout: string; index: number }>`
  height: 100px;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  border: 1px solid #b4b4b4;
  padding: 12px;
  ${(props) => {
    switch (props.selectedLayout) {
      case "1/3":
        return props.index === 1
          ? "  background-color: #e0e0e0"
          : "color: transparent";
      case "2/3":
        return props.index <= 2
          ? "background-color: #e0e0e0"
          : "color: transparent";
      case "3/3":
        return "  background-color: #e0e0e0";
      default:
        return "transparent";
    }
  }};
`;
