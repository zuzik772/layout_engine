"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import styled from "styled-components";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";
import { ModuleSpec } from "@/app/data/typings";
import { useEffect, useState } from "react";

import AntDrawer from "@/app/components/drawer/Drawer";
import DragAndDropTable from "@/app/components/table/DragAndDropTable";
import { getModuleGroupSpecs } from "@/app/api/module-group-spec-module-specs/[id]";
import { useModuleGroupSpecs } from "@/app/hooks/use-module-group-specs";

export default function ModuleSpecsPage() {
  const { memoizedModuleGroups } = useModuleGroupProvider();
  const moduleGroups = memoizedModuleGroups;
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);
  const moduleGroupSpecs = useModuleGroupSpecs(id);

  function handleImport() {
    console.log("import data funciton");
  }

  //   sportsbook home etc.
  const moduleGroupSpec = moduleGroups.find((spec) => spec.id === id);

  return (
    <Container>
      <FlexContainer>
        <Link href="../">Go back</Link>
        <h2>{moduleGroupSpec?.name}</h2>
        <Wrapper>
          <SelectableDropdown />
        </Wrapper>
        <button onClick={handleImport}>Import Specs</button>
        <button>Delete</button>
      </FlexContainer>
      <TableWrapper>
        {/* <ModuleSpecsTable /> */}
        <DragAndDropTable />

        <AntDrawer />
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
