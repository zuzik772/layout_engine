import { Form, Row, Col, Input, Select, Button, message, CheckboxProps, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerMode from "./ContainerMode";
import { useDebouncedCallback } from "use-debounce";

import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { DesktopLayoutConfig } from "@/app/data/typings";
import { ContainerCss, Wrapper } from "./DrawerMobileContent";
import DesktopLayoutConfiguration from "./layout/DesktopLayoutConfiguration";
import { useDesktopLayoutConfig } from "@/app/hooks/use-desktop-layout-config";

const DrawerDesktopContent = () => {
  const { selectedSpecId, closeDrawer, drawerState, setDrawerState, desktopLayoutConfig, setDesktopLayoutConfig } = useDrawerContext();
  const { desktopConfig, addDesktopConfiguration, updateDesktopConfiguration, isLoading } = useDesktopLayoutConfig(selectedSpecId);
  const [isContainer, setIsContainer] = useState(false);
  const [value, setValue] = useState("");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;

  const selectedDesktopConfig: DesktopLayoutConfig = Array.isArray(desktopConfig) ? desktopConfig[0] : desktopConfig;

  console.log("selectedDesktopConfig", selectedDesktopConfig);
  const defaultValue: DesktopLayoutConfig = {
    spec_id: selectedSpecId ?? 0,
    title: "",
    type: "",
    layout_option: "3/3",
    boxed: false,
    columns: 1,
    rows: 1,
  };

  useEffect(() => {
    form.resetFields();
    if (selectedSpecId && desktopConfig) {
      form.setFieldsValue({
        ...defaultValue,
        ...selectedDesktopConfig,
      });
      setDrawerState("edit");
    } else {
      form.setFieldsValue(defaultValue);
      setDrawerState("create");
    }
  }, [selectedSpecId, desktopConfig, form]);

  const debouncedTitle = useDebouncedCallback(
    (newTitle) => {
      if (selectedSpecId) {
        setDesktopLayoutConfig({
          ...desktopLayoutConfig,
          spec_id: selectedSpecId,
          title: newTitle,
        });
      }
    },
    300 // delay in ms
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    form.setFieldsValue({ title: newTitle });
    debouncedTitle(newTitle);
  };

  const handleTypeChange = (e: string) => {
    form.setFieldsValue({ type: e });
    selectedSpecId &&
      setDesktopLayoutConfig({
        ...desktopLayoutConfig,
        spec_id: selectedSpecId,
        type: e,
      });
  };

  const handleContainerChange: CheckboxProps["onChange"] = (e) => {
    form.setFieldsValue({ boxed: e.target.checked });
    selectedSpecId &&
      setDesktopLayoutConfig({
        ...desktopLayoutConfig,
        spec_id: selectedSpecId,
        boxed: e.target.checked,
      });
  };

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    if (!values.title || !values.type) {
      messageApi.open({
        type: "error",
        content: "Please fill in all required fields.",
      });
      return;
    }
    const updatedConfig = { ...values, spec_id: selectedSpecId };

    try {
      if (drawerState === "edit") {
        console.log("updating config", updatedConfig);
        // Make a PATCH request
        await updateDesktopConfiguration(updatedConfig);
        messageApi.open({
          type: "success",
          content: "Configuration updated successfully!",
        });
      } else {
        console.log("creating config", updatedConfig);
        // Make a POST request
        await addDesktopConfiguration(updatedConfig);
        messageApi.open({
          type: "success",
          content: "Configuration created successfully!",
        });
      }
      setDesktopLayoutConfig(updatedConfig);
      closeDrawer();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "An error occurred while saving the configuration.",
      });
    }
  };
  if (isLoading) {
    return <Skeleton active />;
  }
  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={onFinish} layout="vertical" hideRequiredMark initialValues={selectedDesktopConfig}>
        <ContainerCss>
          <Row gutter={16}>
            <Col span={12}>
              <StyledFormItem name="title" label="Title" rules={[{ required: true, message: "Please enter title" }]}>
                <Input placeholder="Please enter title" onChange={(e) => handleTitleChange(e)} value={form.getFieldValue("title")} />
              </StyledFormItem>
            </Col>
            <Col span={12}>
              <StyledFormItem name="type" label="Type" rules={[{ required: true, message: "Please choose the type" }]}>
                <Select placeholder="Please choose the type" onSelect={(e) => handleTypeChange(e)}>
                  <Option value="all">All Games</Option>
                  <Option value="favourites">Favourites</Option>
                </Select>
              </StyledFormItem>
            </Col>
          </Row>

          {/* Equivalent to Boxed attribute */}
          <ContainerMode
            isChecked={form.getFieldValue("boxed")} // Use form state
            onChange={handleContainerChange}
          />

          {/* Equivalent to fillColumns attribute */}
          <DesktopLayoutConfiguration isContainer={isContainer} title={value} />
        </ContainerCss>
        <Wrapper>
          <Button onClick={closeDrawer}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Publish
          </Button>
        </Wrapper>
      </Form>
    </>
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
