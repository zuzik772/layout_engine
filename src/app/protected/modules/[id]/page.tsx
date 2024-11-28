"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import styled from "styled-components";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";
import { ModuleSpec } from "@/app/data/typings";
import { useEffect, useMemo, useState } from "react";
import { getModuleGroupSpecs } from "@/app/api/module-group-specs/api";
import AntDrawer from "@/app/components/drawer/Drawer";
import { useDrawerContext } from "@/app/providers/DrawerProvider";
import { ModuleSpecsTable } from "@/app/components/table/ModuleSpecsTable";

export default function ModuleSpecsPage() {
  const { openDrawer } = useDrawerContext();
  const { memoizedModuleGroups } = useModuleGroupProvider();
  const moduleGroups = memoizedModuleGroups;
  const { allModuleSpecs, setModuleSpecs } = useModuleGroupProvider();
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>(
    []
  );

  useEffect(() => {
    getModuleGroupSpecs(id).then((data) => {
      setSelectedModuleSpecs(data);
    });
  }, []);

  function handleImport() {
    getModuleGroupSpecs(id).then((data) => {
      setSelectedModuleSpecs(data);
    });
  }

  //   sportsbook home etc.
  const moduleGroupSpec = moduleGroups.find((spec) => spec.id === id);

  return (
    <div>
      <FlexContainer>
        <Link href="../">Go back</Link>
        <h2>{moduleGroupSpec?.name}</h2>
        <Wrapper>
          <SelectableDropdown
            moduleSpecs={allModuleSpecs}
            setModuleSpecs={setModuleSpecs}
          />
        </Wrapper>
        <button onClick={handleImport}>Import Specs</button>
        <button onClick={() => setSelectedModuleSpecs([])}>Delete</button>
      </FlexContainer>
      <TableWrapper>
        <ModuleSpecsTable />
        <AntDrawer />
      </TableWrapper>
    </div>
  );
}

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
