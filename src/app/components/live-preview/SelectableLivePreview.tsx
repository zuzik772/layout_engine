import React, { useCallback, useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Modal, Skeleton, Typography } from "antd";
import styled from "styled-components";
import LivePreview from "./LivePreview";
import { getMobileConfigIDS } from "@/app/api/mobile-layout-configuration";
import { getDesktopConfigIDS } from "@/app/api/desktop-layout-configuration";
import { LayoutConfig } from "@/app/data/typings";
import { usePathname } from "next/navigation";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-group-specs";
import { useSpecsPositions } from "@/app/hooks/use-specs-positions";

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
  const { specsPositions } = useSpecsPositions(id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig[]>();

  const fetchPublishedLayout = useCallback(async () => {
    try {
      setIsLoading(true);
      const [mobileConfig, desktopConfig]: [LayoutConfig[], LayoutConfig[]] = await Promise.all([getMobileConfigIDS(), getDesktopConfigIDS()]);
      const config = previewMode === "mobile" ? mobileConfig : desktopConfig;

      if (moduleGroupSpecs) {
        //filter out disabled specs
        const moduleGroupSpecIds = moduleGroupSpecs.filter((spec) => !spec.disabled).map((spec) => Number(spec.id));
        const allConfigIds = config.map((item) => item.spec_id);

        const matchingConfigIds = moduleGroupSpecIds.filter((id) => allConfigIds.includes(id));
        const layoutConfig = config.filter((item) => matchingConfigIds.includes(item.spec_id));
        // before i set the selected preview, i need to sort the matchedPreviewData based on the current_position
        if (specsPositions && specsPositions.length > 0) {
          //filter positons from all specs positions that match the module group spec ids
          const filteredLayoutConfig = layoutConfig.filter((config) =>
            specsPositions.some((position) => position.module_group_specs_id === config.spec_id)
          );
          const sortedLayoutConfig = filteredLayoutConfig
            .map((config) => {
              const position = specsPositions.find((position) => position.module_group_specs_id === config.spec_id);
              return { ...config, current_position: position?.current_position ?? -1 };
            })
            .sort((a, b) => a.current_position - b.current_position);
          console.log("sortedLayoutConfig", sortedLayoutConfig);
          setLayoutConfig(sortedLayoutConfig);
        } else {
          setLayoutConfig(layoutConfig);
        }
      }
    } catch (error) {
      console.error("Error fetching published IDs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [previewMode, moduleGroupSpecs]);

  useEffect(() => {
    if (previewMode) {
      fetchPublishedLayout();
    }
  }, [previewMode, fetchPublishedLayout]);

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
        {isLoading ? <Skeleton active /> : layoutConfig && <LivePreview layoutConfig={layoutConfig} />}
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
