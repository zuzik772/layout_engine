import { Checkbox, Form, Row, Col, CheckboxProps } from "antd";
import { StyledFormItem } from "./DrawerContent";

interface ContainerModeProps {
  isChecked: boolean;
  onChange: CheckboxProps["onChange"];
}

const ContainerMode = ({ isChecked, onChange }: ContainerModeProps) => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <StyledFormItem
          label="Container Mode"
          name="container"
          style={{
            border: isChecked ? "1px solid #d9d9d9" : "none",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <Checkbox onChange={onChange} checked={isChecked}>
            {(isChecked ? "With" : "Without") + " Container"}
          </Checkbox>
        </StyledFormItem>
      </Col>
    </Row>
  );
};

export default ContainerMode;
