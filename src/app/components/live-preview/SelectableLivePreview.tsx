import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Modal, Typography } from "antd";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import LivePreview from "./LivePreview";

const SelectableLivePreview = () => {
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop" | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // Track the key separately

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
  const mobileMock = [
    { selectableLayout: "3/3", numberOfColumns: 2, numberOfRows: 3, isContainer: true, title: "Title 1" },
    { selectableLayout: "3/3", numberOfColumns: 2, numberOfRows: 1, isContainer: false, title: "Title 2" },
    { selectableLayout: "3/3", numberOfColumns: 3, numberOfRows: 3, isContainer: true, title: "Title 3" },
    { selectableLayout: "3/3", numberOfColumns: 4, numberOfRows: 2, isContainer: false, title: "Title 4" },
    { selectableLayout: "3/3", numberOfColumns: 5, numberOfRows: 1, isContainer: true, title: "Title 5" },
  ];

  const desktopMock = [
    { selectableLayout: "2/3", numberOfColumns: 1, numberOfRows: 3, isContainer: true, title: "Title 1" },
    { selectableLayout: "1/3", numberOfColumns: 4, numberOfRows: 1, isContainer: false, title: "Title 2" },
    { selectableLayout: "2/3", numberOfColumns: 5, numberOfRows: 4, isContainer: false, title: "Title 3" },
    { selectableLayout: "1/3", numberOfColumns: 3, numberOfRows: 3, isContainer: true, title: "Title 4" },
    { selectableLayout: "3/3", numberOfColumns: 2, numberOfRows: 1, isContainer: true, title: "Title 5" },
  ];

  const data = previewMode === "mobile" ? mobileMock : desktopMock;
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
        <LivePreview layout={data} />
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
