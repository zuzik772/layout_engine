"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import DragAndDropTable from "@/app/components/table/DragAndDropTable";
import { useModuleGroups } from "@/app/hooks/use-module-groups";
import { Button } from "antd";
import AntDrawer from "@/app/components/drawer/AntDrawer";
import LayoutTypeProvider from "@/app/components/drawer/layout/LayoutProvider";
import SelectableMobileSpec from "@/app/components/dropdown/SelectableModuleSpec";
import SelectableLivePreview from "@/app/components/live-preview/SelectableLivePreview";

export default function ModuleSpecsPage() {
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);
  const { moduleGroups } = useModuleGroups();

  //   sportsbook home etc.
  const moduleGroup = moduleGroups && moduleGroups.find((spec) => spec.id === id);

  return (
    <Container>
      <FlexContainer>
        <Link href="../">
          <Button>
            <ArrowLeftOutlined />
          </Button>
        </Link>
        <h2>{moduleGroup?.name}</h2>
        <Wrapper>
          <SelectableLivePreview />
          <SelectableMobileSpec />
        </Wrapper>
      </FlexContainer>
      <TableWrapper>
        {/* <ModuleSpecsTable /> */}
        <LayoutTypeProvider>
          <DragAndDropTable />
          <AntDrawer />
        </LayoutTypeProvider>
      </TableWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow: auto;
  padding-right: 1rem;
`;

const Wrapper = styled.div`
  overflow: auto;
  display: flex;
  gap: 1rem;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(-140px + 100vh);
  overflow-y: auto;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  padding: 1rem 0;
`;
