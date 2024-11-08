"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import styled from "styled-components";
import { Table, TableWrapper } from "@/app/components/table/styling";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";
import { ModuleSpec } from "@/app/data/typings";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { get } from "http";

export default function ModuleSpecsPage() {
  // const moduleGroupsSpecs = data.module_group_specs;
  const { memoizedModuleGroups, allModuleSpecs, setModuleSpecs } =
    useModuleGroupProvider();
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);
  const moduleGroups = memoizedModuleGroups;

  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>(
    []
  );

  async function getModuleGroupSpecs(id: number): Promise<ModuleSpec[]> {
    try {
      console.log("id", id);
      const res = await axios.get(`/api/module-group-spec-module-specs/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching module group specs:", error);
      throw error;
    }
  }

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
                <tr key={spec.id}>
                  <td>{spec.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
