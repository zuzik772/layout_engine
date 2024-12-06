import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Modal, Skeleton, Typography } from "antd";
import styled from "styled-components";
import LivePreview from "./LivePreview";
import { getMobileConfigIDS } from "@/app/api/mobile-layout-configuration";
import { getDesktopConfigIDS } from "@/app/api/desktop-layout-configuration";
import { DesktopLayoutConfig, MobileLayoutConfig } from "@/app/data/typings";
import { usePathname } from "next/navigation";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-group-specs";

const SelectableLivePreview = () => {
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    previewMode: null as "mobile" | "desktop" | null,
  });

  const items: MenuProps["items"] = [
    { key: "mobile", label: "Mobile Preview" },
    { key: "desktop", label: "Desktop Preview" },
  ];

  const handleSelect: MenuProps["onSelect"] = (e) => {
    setModalState({
      isModalOpen: true,
      previewMode: e.key as "mobile" | "desktop",
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isModalOpen: false,
      previewMode: null,
    });
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
      {modalState.isModalOpen && (
        <ModalContent isModalOpen={modalState.isModalOpen} setIsModalOpen={handleCloseModal} previewMode={modalState.previewMode} />
      )}
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
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);
  const { moduleGroupSpecs } = useModuleGroupSpecs(id);
  console.log(moduleGroupSpecs);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPreview, setSelectedPreview] = useState<any>();
  const [publishedIds, setPublishedIds] = useState<number[]>([]);
  useEffect(() => {
    const fetchPublishedLayout = async () => {
      try {
        const [mobileData, desktopData]: [MobileLayoutConfig[], DesktopLayoutConfig[]] = await Promise.all([
          getMobileConfigIDS(),
          getDesktopConfigIDS(),
        ]);
        setIsLoading(false);
        const data = previewMode === "mobile" ? mobileData : desktopData;

        if (moduleGroupSpecs) {
          const moduleGroupSpecIds = moduleGroupSpecs.filter((spec) => !spec.disabled).map((spec) => Number(spec.id));
          const previewDataIds = data.map((item) => item.spec_id);
          const matchingPreviewIds = moduleGroupSpecIds.filter((id) => previewDataIds.includes(id));
          setPublishedIds(matchingPreviewIds);
          const matchedPreviewData = data.filter((item) => matchingPreviewIds.includes(item.spec_id));
          console.log("matchedPreviewData", matchedPreviewData);
          setSelectedPreview(matchedPreviewData);
        }
      } catch (error) {
        console.error("Error fetching published IDs:", error);
        setIsLoading(false);
      }
    };
    if (previewMode) {
      setIsLoading(true);
      fetchPublishedLayout();
    }
  }, [moduleGroupSpecs, previewMode]);

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
      <ContainerCss previewMode={previewMode}>
        {isLoading ? <Skeleton active /> : selectedPreview && <LivePreview layoutConfig={selectedPreview} />}
      </ContainerCss>
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
