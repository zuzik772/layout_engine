"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import DragAndDropTable from "@/app/components/table/DragAndDropTable";
import { useModuleGroups } from "@/app/hooks/use-module-groups";
import { Button } from "antd";
import DesktopDrawer from "@/app/components/drawer/DesktopDrawer";
import MobileDrawer from "@/app/components/drawer/MobileDrawer";

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
          <SelectableDropdown />
        </Wrapper>
      </FlexContainer>
      <TableWrapper>
        {/* <ModuleSpecsTable /> */}
        <DragAndDropTable />
        <MobileDrawer />
        <DesktopDrawer />
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
