import { Row, Col, Radio, CheckboxProps } from "antd";
import React, { useState } from "react";
import { StyledFormItem } from "../DrawerContent";
import styled from "styled-components";
import { useLayoutTypeContext } from "./LayoutProvider";

const LayoutType = () => {
  const { isMobileLayout } = useLayoutTypeContext();
  const [selectedMobileLayout, setSelectedMobileLayout] = useState("3/3");
  const [selectedWebLayout, setSelectedWebLayout] = useState("3/3");

  const layoutOptions = [
    { label: "1/3", value: "1/3" },
    { label: "2/3", value: "2/3" },
    { label: "3/3", value: "3/3" },
  ];

  const handleLayoutChange: CheckboxProps["onChange"] = (e) => {
    if (isMobileLayout) {
      setSelectedMobileLayout(e.target.value);
    } else {
      setSelectedWebLayout(e.target.value);
    }
  };

  const getColumnIndices = () => {
    switch (getSelectedLayout()) {
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

  const getSelectedLayout = () => {
    return isMobileLayout ? selectedMobileLayout : selectedWebLayout;
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <StyledFormItem label="Choose layout">
            <Radio.Group
              block
              options={layoutOptions}
              defaultValue="3/3"
              optionType="button"
              onChange={handleLayoutChange}
              value={getSelectedLayout()}
            />
          </StyledFormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <StyledFormItem label={"Layout Preview"}>
            <WrapperCss>
              {getColumnIndices().map((index) => (
                <LayoutPreviewCss key={index} selectedLayout={getSelectedLayout()} index={index}>
                  {index === 3 ? <p>Full screen layout</p> : <p>{index}/3 layout</p>}
                </LayoutPreviewCss>
              ))}
            </WrapperCss>
          </StyledFormItem>
        </Col>
      </Row>
    </>
  );
};

export default LayoutType;

const WrapperCss = styled.div`
  display: flex;
  div:first-child {
    border-radius: 8px 0 0 8px;
  }

  div:last-child {
    border-radius: 0 8px 8px 0;
  }

  div:only-child {
    border-radius: 8px;
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
  ${({ index, selectedLayout }) => {
    const bgColor = "background-color: #e0e0e0";
    switch (selectedLayout) {
      case "1/3":
        return index === 1 ? bgColor : "color: transparent";
      case "2/3":
        return index <= 2 ? bgColor : "color: transparent";
      case "3/3":
        return bgColor;
    }
  }};
`;
