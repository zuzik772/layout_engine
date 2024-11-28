"use client";

import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { Form, Input, Select, CheckboxProps, Space, Button, Skeleton, message } from "antd";
import { StyledFormItem } from "./DrawerDesktopContent";
import ContainerMode from "./ContainerMode";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import MobileLayoutConfiguration from "./layout/MobileLayoutConfiguration";
import { useMobileLayoutConfig } from "@/app/hooks/use-mobile-layout-config";
import { MobileLayoutConfig } from "@/app/data/typings";
import styled from "styled-components";

function DrawerMobileContent() {
  const { mobileLayoutConfig, setMobileLayoutConfig, selectedSpecId, closeDrawer } = useDrawerContext();
  const { mobileConfig, addMobileConfiguration, isLoading } = useMobileLayoutConfig(selectedSpecId);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;

  const selectedMobileConfig: MobileLayoutConfig = Array.isArray(mobileConfig) ? mobileConfig[0] : mobileConfig;
  const defaultValue: MobileLayoutConfig = {
    spec_id: selectedSpecId ?? 0,
    title: "",
    type: "",
    boxed: false,
    columns: 1,
    rows: 1,
  };

  useEffect(() => {
    form.resetFields();
    if (selectedSpecId && mobileConfig) {
      form.setFieldsValue({
        ...defaultValue,
        ...selectedMobileConfig,
      });
    } else {
      form.setFieldsValue(defaultValue);
    }
  }, [selectedSpecId, mobileConfig, form]);

  const debouncedTitle = useDebouncedCallback(
    (newTitle) => {
      if (selectedSpecId) {
        setMobileLayoutConfig({
          ...mobileLayoutConfig,
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
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        spec_id: selectedSpecId,
        type: e,
      });
  };

  const handleContainerChange: CheckboxProps["onChange"] = (e) => {
    form.setFieldsValue({ boxed: e.target.checked });
    selectedSpecId &&
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        spec_id: selectedSpecId,
        boxed: e.target.checked,
      });
  };

  const onFinish = (values: MobileLayoutConfig) => {
    console.log(values);
    if (!values.title || !values.type) {
      messageApi.open({
        type: "error",
        content: "Please fill in all required fields.",
      });
      return;
    }

    if (selectedSpecId) {
      const updatedConfig = { ...values, spec_id: selectedSpecId };
      setMobileLayoutConfig(updatedConfig);
      addMobileConfiguration(updatedConfig); // Submit the updated config
      messageApi.open({
        type: "success",
        content: "Configuration published successfully!",
      });
      closeDrawer();
    }
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={onFinish} layout="vertical" hideRequiredMark initialValues={selectedMobileConfig}>
        <div>
          <StyledFormItem name="title" label="Title" rules={[{ required: true, message: "Please enter title" }]}>
            <Input placeholder="Please enter title" onChange={(e) => handleTitleChange(e)} value={form.getFieldValue("title")} />
          </StyledFormItem>
          <StyledFormItem name="type" label="Type" rules={[{ required: true, message: "Please choose the type" }]}>
            <Select placeholder="Please choose the type" onSelect={(e) => handleTypeChange(e)}>
              <Option value="all">All</Option>
              <Option value="favourites">Favourites</Option>
            </Select>
          </StyledFormItem>
          {/* Equivalent to Boxed attribute */}
          <ContainerMode
            isChecked={form.getFieldValue("boxed")} // Use form state
            onChange={handleContainerChange}
          />
          {/* Equivalent to fillColumns attribute */}
          <MobileLayoutConfiguration isMobileContainer={form.getFieldValue("boxed")} title={form.getFieldValue("title")} />
        </div>
        <Wrapper>
          <Button onClick={closeDrawer}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Publish
          </Button>
        </Wrapper>
      </Form>
    </>
  );
}

export default DrawerMobileContent;

const Wrapper = styled(Space)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #e9e9e9;
`;
