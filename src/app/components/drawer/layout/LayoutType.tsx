import { Row, Col, Radio, CheckboxProps } from "antd";
import React, { useState } from "react";
import { StyledFormItem } from "../DrawerDesktopContent";
import { useLayoutTypeContext } from "./LayoutProvider";
import LayoutPreview from "./LayoutPreview";
// import CustomLayoutSelect from "../CustomLayoutSelect";

type LayoutTypeProps = {
  isMobileContainer: boolean;
  title?: string;
};

const LayoutType = ({ isMobileContainer, title }: LayoutTypeProps) => {
  const { isMobileLayout } = useLayoutTypeContext();
  const [selectedWebLayout, setSelectedWebLayout] = useState("3/3");

  // State for mobile and web columns
  const [selectedMobileColumns, setSelectedMobileColumns] = useState<number>(1);
  const [selectedWebColumns, setSelectedWebColumns] = useState<number>(1);

  // State for mobile and web rows
  const [selectedMobileRows, setSelectedMobileRows] = useState<number>(1);
  const [selectedWebRows, setSelectedWebRows] = useState<number>(1);

  // State to hold the currently displayed columns and rows based on layout
  const [currentColumns, setCurrentColumns] = useState<number>(
    isMobileLayout ? selectedMobileColumns : selectedWebColumns
  );
  const [currentRows, setCurrentRows] = useState<number>(
    isMobileLayout ? selectedMobileRows : selectedWebRows
  );

  const layoutOptions = [
    { label: "1/3", value: "1/3" }, //mobile has only 1 column layout
    { label: "2/3", value: "2/3" },
    { label: "3/3", value: "3/3" },
  ];

  const handleLayoutChange: CheckboxProps["onChange"] = (e) => {
    setSelectedWebLayout(e.target.value);
  };

  return (
    <>
      {!isMobileLayout && (
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
      )}
      {/* <CustomLayoutSelect
        selectedMobileRows={selectedMobileRows}
        setSelectedMobileRows={setSelectedMobileRows}
        selectedWebRows={selectedWebRows}
        setSelectedWebRows={setSelectedWebRows}
        selectedMobileColumns={selectedMobileColumns}
        setSelectedMobileColumns={setSelectedMobileColumns}
        selectedWebColumns={selectedWebColumns}
        setSelectedWebColumns={setSelectedWebColumns}
        currentColumns={currentColumns}
        setCurrentColumns={setCurrentColumns}
        currentRows={currentRows}
        setCurrentRows={setCurrentRows}
      /> */}
      <LayoutPreview
        selectedLayout={selectedWebLayout}
        numberOfColumns={currentColumns}
        numberOfRows={currentRows}
        isMobileContainer={isMobileContainer}
        title={title}
      />
    </>
  );
};

export default LayoutType;
