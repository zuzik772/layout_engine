"use client";

import data from "../../../data/module_groups_specs.json";
import module_specs from "../../../data/module_specs.json";
import { usePathname } from "next/navigation";
import { FlexContainer, Table, TableWrapper } from "../../page";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import styled from "styled-components";
import { useState } from "react";

export default function ModuleSpecsPage() {
  const moduleGroupsSpecs = data.module_group_specs;
  const pathname = usePathname();
  const id = pathname.split("/")[3];

  //   sportsbook home
  const moduleGroupSpec = moduleGroupsSpecs.find(
    (spec) => spec.id === parseInt(id)
  );

  const selectedModuleSpecIds =
    moduleGroupSpec?.module_group_spec_module_spec_ids.map(
      (moduleSpec) => moduleSpec.module_spec_id
    );

  //find selected module specs names from all module specs
  const selectedModuleSpecNames = module_specs.module_specs.filter(
    (moduleSpec) => selectedModuleSpecIds?.includes(moduleSpec.id)
  );
  const [moduleSpecs, setModuleSpecs] = useState(module_specs.module_specs);
  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState(
    selectedModuleSpecNames
  );

  return (
    <div>
      <FlexContainer>
        <Link href="../">Go back</Link>
        <h2>{moduleGroupSpec?.name}</h2>
        <Wrapper>
          <SelectableDropdown
            moduleSpecs={moduleSpecs}
            setModuleSpecs={setModuleSpecs}
          />
        </Wrapper>
        <button onClick={() => setSelectedModuleSpecs(selectedModuleSpecNames)}>
          Import Specs
        </button>
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
