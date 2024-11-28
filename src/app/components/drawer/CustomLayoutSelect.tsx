import { Select, Col, Row } from "antd";
import { StyledFormItem } from "./DrawerContent";
import { useLayoutTypeContext } from "./layout/LayoutProvider";
import { useEffect } from "react";

interface CustomLayoutSelectProps {
  selectedMobileRows: number;
  setSelectedMobileRows: (value: number) => void;
  selectedWebRows: number;
  setSelectedWebRows: (value: number) => void;
  selectedMobileColumns: number;
  setSelectedMobileColumns: (value: number) => void;
  selectedWebColumns: number;
  setSelectedWebColumns: (value: number) => void;
  currentColumns: number;
  setCurrentColumns: (value: number) => void;
  currentRows: number;
  setCurrentRows: (value: number) => void;
}

const CustomLayoutSelect = (props: CustomLayoutSelectProps) => {
  const {
    selectedMobileRows,
    setSelectedMobileRows,
    selectedWebRows,
    setSelectedWebRows,
    selectedMobileColumns,
    setSelectedMobileColumns,
    selectedWebColumns,
    setSelectedWebColumns,
    currentColumns,
    setCurrentColumns,
    currentRows,
    setCurrentRows,
  } = props;
  const { isMobileLayout } = useLayoutTypeContext();

  const { Option } = Select;

  // useEffect to update current columns and rows when isMobileLayout changes
  useEffect(() => {
    setCurrentColumns(isMobileLayout ? selectedMobileColumns : selectedWebColumns);
    setCurrentRows(isMobileLayout ? selectedMobileRows : selectedWebRows);
  }, [isMobileLayout, selectedMobileColumns, selectedWebColumns, selectedMobileRows, selectedWebRows, setCurrentColumns, setCurrentRows]);

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
