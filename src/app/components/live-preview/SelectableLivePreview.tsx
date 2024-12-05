import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Modal, Skeleton, Typography } from "antd";
import styled from "styled-components";
import LivePreview from "./LivePreview";
import { getMobileConfigIDS } from "@/app/api/mobile-layout-configuration";
import { getDesktopConfigIDS } from "@/app/api/desktop-layout-configuration";
import { DesktopLayoutConfig, MobileLayoutConfig } from "@/app/data/typings";

const SelectableLivePreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop" | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // mobile or desktop

  const items: MenuProps["items"] = [
    { key: "mobile", label: "Mobile Preview" },
    { key: "desktop", label: "Desktop Preview" },
  ];

  const handleSelect: MenuProps["onSelect"] = (e) => {
    setSelectedKey(e.key);
  };

  useEffect(() => {
    if (selectedKey) {
      setPreviewMode(selectedKey as "mobile" | "desktop");
      setIsModalOpen(true);
    }
  }, [selectedKey]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedKey(null);
  };

  return (
    <>
      <Dropdown
        menu={{
          items,
          selectable: true,
          onSelect: handleSelect,
          style: { maxHeight: 400, overflowY: "auto" },
        }}
      >
        <Typography.Link>
          <Button>
            Live preview <DownOutlined />
          </Button>
        </Typography.Link>
      </Dropdown>
      {isModalOpen && <ModalContent isModalOpen={isModalOpen} setIsModalOpen={handleCloseModal} previewMode={previewMode} />}
    </>
  );
};

export default SelectableLivePreview;

const ModalContent = ({
  isModalOpen,
  setIsModalOpen,
  previewMode,
}: {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  previewMode: "mobile" | "desktop" | null;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPreview, setSelectedPreview] = useState<MobileLayoutConfig | DesktopLayoutConfig | null | undefined>();
  useEffect(() => {
    const fetchPublishedLayout = async () => {
      try {
        const [mobileData, desktopData] = await Promise.all([getMobileConfigIDS(), getDesktopConfigIDS()]);
        setIsLoading(false);
        const data = previewMode === "mobile" ? setSelectedPreview(mobileData) : setSelectedPreview(desktopData);
        return data;
      } catch (error) {
        console.error("Error fetching published IDs:", error);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchPublishedLayout();
  }, []);

  return (
    <ModalCss
      title={previewMode === "mobile" ? "Mobile Layout Preview" : "Desktop Layout Preview"}
      open={isModalOpen}
      onOk={setIsModalOpen}
      onCancel={setIsModalOpen}
      style={previewMode !== "mobile" ? { top: 50 } : {}}
      width={previewMode === "mobile" ? 300 : "90vw"}
      styles={{
        body: {
          height: `${previewMode === "mobile" ? 60 : 75}vh`,
          overflowY: "scroll",
        },
      }}
    >
      {isLoading && <Skeleton active />}
      <ContainerCss previewMode={previewMode}>{selectedPreview && <LivePreview layoutConfig={selectedPreview} />}</ContainerCss>
    </ModalCss>
  );
};

const ModalCss = styled(Modal)`
  .ant-modal-content {
    padding: 10px 0 !important;
  }

  .ant-modal-title {
    padding: 0 10px;
  }

  .ant-modal-footer {
    display: none;
  }
`;

interface ContainerProps {
  previewMode: "mobile" | "desktop" | null;
}

const ContainerCss = styled.div<ContainerProps>`
  padding: ${(p) => (p.previewMode === "mobile" ? "10px" : "20px")};
`;
