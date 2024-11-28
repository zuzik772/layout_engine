"use client";

import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { Col, Form, Input, Row, Select, CheckboxProps } from "antd";
import { StyledFormItem } from "./DrawerDesktopContent";
import ContainerMode from "./ContainerMode";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import MobileLayoutConfiguration from "./layout/MobileLayoutConfiguration";
import { useMobileLayoutConfig } from "@/app/hooks/use-mobile-layout-config";

function DrawerMobileContent() {
  const { mobileLayoutConfig, setMobileLayoutConfig, selectedSpecId } =
    useDrawerContext();
  const { mobileConfig } = useMobileLayoutConfig(selectedSpecId ?? 0);
  const [isMobileContainer, setIsMobileContainer] = useState(
    mobileConfig?.boxed ?? false
  );
  const [value, setValue] = useState(mobileConfig?.title ?? "");
  // const debounced = useDebouncedCallback(
  //   (value) => {
  //     setValue(value);
  //   },
  //   100 // delay in ms
  // );
  const { Option } = Select;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    selectedSpecId &&
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        id: selectedSpecId,
        title: value,
      });
  };

  const handleTypeChange = (e: string) => {
    console.log(e);
    selectedSpecId &&
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        id: selectedSpecId,
        type: e,
      });
  };

  const handleContainerChange: CheckboxProps["onChange"] = (e) => {
    setIsMobileContainer(e.target.checked);
    selectedSpecId &&
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        id: selectedSpecId,
        boxed: e.target.checked,
      });
  };
  return (
    <Form layout="vertical" hideRequiredMark>
      <Col>
        <StyledFormItem
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input
            defaultValue={mobileLayoutConfig?.title}
            placeholder="Please enter title"
            onChange={(e) => handleTitleChange(e)}
          />
        </StyledFormItem>
      </Col>
      <Col>
        <StyledFormItem
          name="type"
          label="Type"
          rules={[{ required: true, message: "Please choose the type" }]}
        >
          <Select
            placeholder="Please choose the type"
            onSelect={(e) => handleTypeChange(e)}
            defaultValue={mobileConfig?.type}
          >
            <Option value="all">All</Option>
            <Option value="favourites">Favourites</Option>
          </Select>
        </StyledFormItem>
      </Col>
      {/* Equivalent to Boxed attribute */}
      <ContainerMode
        isChecked={isMobileContainer}
        onChange={(e) => handleContainerChange(e)}
      />

      {/* Equivalent to fillColumns attribute */}
      <MobileLayoutConfiguration
        isMobileContainer={isMobileContainer}
        title={value}
      />
    </Form>
  );
}

export default DrawerMobileContent;
