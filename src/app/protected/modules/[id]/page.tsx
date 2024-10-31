"use client";

import data from "../../../data/module_groups_specs.json";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Table, TableWrapper } from "@/app/components/table/styling";
import { ModuleSpec } from "@/app/data/typings";
import axios from "axios";

export default function ModuleSpecsPage() {
  const moduleGroupsSpecs = data.module_group_specs;
  const pathname = usePathname();
  const id = pathname.split("/")[3];

  //replace module_specs from .json and get them from route.ts instead of importing them

  async function getModuleSpecs(): Promise<ModuleSpec[]> {
    const res = await axios.get("/api/module-specs");
    return res.data;
  }

  useEffect(() => {
    getModuleSpecs().then((data) => {
      setModuleSpecs(data);
    });
  }, []);
  //   sportsbook home
  const moduleGroupSpec = moduleGroupsSpecs.find((spec) => spec.id === parseInt(id));

  const selectedModuleSpecIds = moduleGroupSpec?.module_group_spec_module_spec_ids.map((moduleSpec) => moduleSpec.module_spec_id);

  //find selected module specs names from all module specs
  const [moduleSpecs, setModuleSpecs] = useState<ModuleSpec[]>([]);
  console.log("moduleSpecs", moduleSpecs);
  console.log("selectedModuleSpecIds", selectedModuleSpecIds);
  const selectedModuleSpecNames = moduleSpecs.filter((moduleSpec) => selectedModuleSpecIds?.includes(moduleSpec.module_spec_id));
  console.log("selectedModuleSpecNames", selectedModuleSpecNames);
  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState(selectedModuleSpecNames);
  console.log("selectedModuleSpecs", selectedModuleSpecs);

  return (
    <div>
      <FlexContainer>
        <Link href="../">Go back</Link>
        <h2>{moduleGroupSpec?.name}</h2>
        <Wrapper>
          <SelectableDropdown moduleSpecs={moduleSpecs} setModuleSpecs={setModuleSpecs} />
        </Wrapper>
        <button onClick={() => setSelectedModuleSpecs(selectedModuleSpecNames)}>Import Specs</button>
        <button onClick={() => setSelectedModuleSpecs([])}>Delete</button>
      </FlexContainer>

      {moduleGroupSpec ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Module Spec</th>
              </tr>
            </thead>
            <tbody>
              {selectedModuleSpecNames.map((spec) => (
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
