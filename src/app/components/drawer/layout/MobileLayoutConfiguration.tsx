import { Row, Col, Select } from "antd";
import React from "react";
import { StyledFormItem } from "../DrawerDesktopContent";

import LayoutPreview from "./LayoutPreview";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { useMobileLayoutConfig } from "@/app/hooks/use-mobile-layout-config";

type MobileLayoutConfigurationProps = {
  isMobileContainer: boolean;
  title?: string;
};

const MobileLayoutConfiguration = ({
  isMobileContainer,
  title,
}: MobileLayoutConfigurationProps) => {
  const { selectedSpecId, mobileLayoutConfig, setMobileLayoutConfig } =
    useDrawerContext();
  const { mobileConfig, addMobileConfiguration } =
    useMobileLayoutConfig(selectedSpecId);
  console.log("mobileConfig", mobileConfig);
  //   const [selectedMobileColumns, setSelectedMobileColumns] = useState<number>(1);
  //   const [selectedMobileRows, setSelectedMobileRows] = useState<number>(1);

  const { Option } = Select;
  const mobileConfiguration = mobileConfig;
  console.log("mobileConfiguration", mobileConfiguration);
  //   useEffect(() => {
  //     const mobileConfiguration =
  //       mobileConfig &&
  //       mobileConfig.find((config) => config.spec_id === selectedSpecId);
  //     mobileConfiguration?.columns &&
  //       setSelectedMobileColumns(mobileConfiguration.columns);
  //     mobileConfiguration?.rows &&
  //       setSelectedMobileRows(mobileConfiguration.rows);
  //   }, [mobileConfig]);

  const handleColumnsChange = (value: number) => {
    selectedSpecId &&
      setMobileLayoutConfig({
        ...mobileLayoutConfig,
        id: selectedSpecId,
        columns: value,
      });

    addMobileConfiguration({
      spec_id: selectedSpecId,
      columns: value,
    });
  };
  const handleRowsChange = (value: number) => {
    console.log("rows vlaue", value);
    addMobileConfiguration({
      spec_id: selectedSpecId,
      rows: value,
    });
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <StyledFormItem label={"Columns"}>
            <Select
              defaultValue={mobileConfiguration?.columns ?? 1}
              value={mobileConfiguration?.columns ?? 1}
              onChange={handleColumnsChange}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                <Option key={i} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label={"Rows"}>
            <Select
              defaultValue={mobileConfiguration?.rows ?? 1}
              value={mobileConfiguration?.rows ?? 1}
              onChange={handleRowsChange}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                <Option key={i} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </StyledFormItem>
        </Col>
      </Row>
      <LayoutPreview
        selectedLayout={"3/3"}
        numberOfColumns={mobileConfiguration?.columns ?? 1}
        numberOfRows={mobileConfiguration?.rows ?? 1}
        isMobileContainer={isMobileContainer}
        title={title}
      />
    </>
  );
};

export default MobileLayoutConfiguration;
