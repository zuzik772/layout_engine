"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import styled from "styled-components";
import { Table, TableWrapper } from "@/app/components/table/styling";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";
import { ModuleSpec } from "@/app/data/typings";
import { useEffect, useMemo, useState } from "react";
import { getModuleGroupSpecs } from "@/app/api/module-group-specs/api";
import AntDrawer from "@/app/components/drawer/Drawer";
import { useDrawerContext } from "@/app/providers/DrawerProvider";

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

  const memoizedSelectedGroupSpecs = useMemo(
    () => selectedModuleSpecs,
    [selectedModuleSpecs]
  );

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

      {memoizedSelectedGroupSpecs ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Module Spec</th>
              </tr>
            </thead>
            <tbody>
              {selectedModuleSpecs.map((spec) => (
                <tr key={spec.id} onClick={() => openDrawer(spec.name)}>
                  <td>{spec.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <AntDrawer />
        </TableWrapper>
      ) : (
        <p>Module Group Spec not found</p>
      )}
    </div>
  );
}

const Wrapper = styled.div`
  position: relative;
  max-height: 90vh;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  padding-left: 0;
`;
