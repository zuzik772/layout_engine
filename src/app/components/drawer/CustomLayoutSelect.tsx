import { Select, Col, Row } from "antd";
import { StyledFormItem } from "./DrawerContent";
import { useLayoutTypeContext } from "./layout/LayoutProvider";
import { useState, useEffect } from "react";

const CustomLayoutSelect = () => {
  const { isMobileLayout } = useLayoutTypeContext();

  // State for mobile and web columns
  const [selectedMobileColumns, setSelectedMobileColumns] = useState<number>(1);
  const [selectedWebColumns, setSelectedWebColumns] = useState<number>(1);

  // State for mobile and web rows
  const [selectedMobileRows, setSelectedMobileRows] = useState<number>(1);
  const [selectedWebRows, setSelectedWebRows] = useState<number>(1);

  // State to hold the currently displayed columns and rows based on layout
  const [currentColumns, setCurrentColumns] = useState<number>(isMobileLayout ? selectedMobileColumns : selectedWebColumns);
  const [currentRows, setCurrentRows] = useState<number>(isMobileLayout ? selectedMobileRows : selectedWebRows);

  const { Option } = Select;

  // useEffect to update current columns and rows when isMobileLayout changes
  useEffect(() => {
    setCurrentColumns(isMobileLayout ? selectedMobileColumns : selectedWebColumns);
    setCurrentRows(isMobileLayout ? selectedMobileRows : selectedWebRows);
  }, [isMobileLayout, selectedMobileColumns, selectedWebColumns, selectedMobileRows, selectedWebRows]);

  // Handlers to update columns and rows based on the current layout
  const handleColumnsChange = (value: number) => {
    if (isMobileLayout) {
      setSelectedMobileColumns(value);
    } else {
      setSelectedWebColumns(value);
    }
    setCurrentColumns(value); // Update the displayed columns
  };

  const handleRowsChange = (value: number) => {
    if (isMobileLayout) {
      setSelectedMobileRows(value);
    } else {
      setSelectedWebRows(value);
    }
    setCurrentRows(value); // Update the displayed rows
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <StyledFormItem label={"Columns"}>
          <Select value={currentColumns} onChange={handleColumnsChange}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
              <Option key={i} value={i}>
                {i} columns ({isMobileLayout ? "Mobile" : "Web"})
              </Option>
            ))}
          </Select>
        </StyledFormItem>
      </Col>
      <Col span={12}>
        <StyledFormItem label={"Rows"}>
          <Select value={currentRows} onChange={handleRowsChange}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
              <Option key={i} value={i}>
                {i} rows ({isMobileLayout ? "Mobile" : "Web"})
              </Option>
            ))}
          </Select>
        </StyledFormItem>
      </Col>
    </Row>
  );
};

export default CustomLayoutSelect;
