import { Form, Row, Col, Input, Select, Radio } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import ContainerMode from "./ContainerMode";
import { useDebouncedCallback } from "use-debounce";
import DesktopLayoutConfiguration from "./layout/DesktopLayoutConfiguration";

const DrawerDesktopContent = () => {
  const [isMobileContainer, setIsMobileContainer] = useState(false);
  const [value, setValue] = useState("");
  const debounced = useDebouncedCallback(
    (value) => {
      setValue(value);
    },
    300 // delay in ms
  );
  const { Option } = Select;

  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <StyledFormItem
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input
              placeholder="Please enter title"
              onChange={(e) => debounced(e.target.value)}
            />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Select placeholder="Please choose the type">
              <Option value="all">All Games</Option>
              <Option value="favourites">Favourites</Option>
            </Select>
          </StyledFormItem>
        </Col>
      </Row>

      {/* Equivalent to Boxed attribute */}
      <ContainerMode
        isChecked={isMobileContainer}
        onChange={(e) => setIsMobileContainer(e.target.checked)}
      />

      {/* Equivalent to fillColumns attribute */}
      <DesktopLayoutConfiguration isMobileContainer />
    </Form>
  );
};

export default DrawerDesktopContent;

export const SectionTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
`;

export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    font-weight: 600;
  }
`;
