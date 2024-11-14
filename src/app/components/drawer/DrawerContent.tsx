import { Form, Row, Col, Input, Select, Radio } from "antd";
import React, { useState } from "react";
import type { CheckboxProps } from "antd";
import styled from "styled-components";
import ContainerMode from "./ContainerMode";
import LayoutType from "./layout/LayoutType";
import { useLayoutTypeContext } from "./layout/LayoutProvider";
import CustomLayoutSelect from "./CustomLayoutSelect";

const DrawerContent = () => {
  const { isMobileLayout, setIsMobileLayout } = useLayoutTypeContext();

  const [isMobileContainer, setIsMobileContainer] = useState(false);
  const [isWebContainer, setIsWebContainer] = useState(false);

  const { Option } = Select;

  const options = [
    { label: "Mobile", value: "Mobile" },
    { label: "Web", value: "Web" },
  ];

  const handleContainerModeChange: CheckboxProps["onChange"] = (e) => {
    const value = e.target.value;
    setIsMobileLayout(value === "Mobile");
  };

  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <StyledFormItem name="title" label="Title" rules={[{ required: true, message: "Please enter title" }]}>
            <Input placeholder="Please enter title" />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem name="type" label="Module type / Game collection" rules={[{ required: true, message: "Please choose the type" }]}>
            <Select placeholder="Please choose the type">
              <Option value="all">All Games</Option>
              <Option value="favourites">Favourites</Option>
            </Select>
          </StyledFormItem>
        </Col>
      </Row>

      <WrapperCss>
        <SectionTitle>Layout Settings</SectionTitle>
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

        {isMobileLayout ? (
          <>
            {/* Equivalent to Boxed attribute */}
            <ContainerMode isChecked={isMobileContainer} onChange={(e) => setIsMobileContainer(e.target.checked)} />
          </>
        ) : (
          <>
            {/* Equivalent to Boxed attribute */}
            <ContainerMode isChecked={isWebContainer} onChange={(e) => setIsWebContainer(e.target.checked)} />
          </>
        )}

        {/* Equivalent to fillColumns attribute */}
        <LayoutType isMobileContainer={isMobileContainer} />
      </WrapperCss>
    </Form>
  );
};

export default DrawerContent;

const SectionTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
`;

export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    font-weight: 600;
  }
`;

const WrapperCss = styled.div`
  margin-top: 16px;
  padding: 8px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
