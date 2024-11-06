"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SelectableDropdown from "@/app/components/ant/Dropdown";
import styled from "styled-components";
import { Table, TableWrapper } from "@/app/components/table/styling";
import { useModuleGroupProvider } from "@/app/providers/ModuleGroupProvider";

export default function ModuleSpecsPage() {
  // const moduleGroupsSpecs = data.module_group_specs;
  const {
    moduleGroups,
    selectedModuleSpecs,
    allModuleSpecs,
    setAllModuleSpecs,
  } = useModuleGroupProvider();
  const pathname = usePathname();
  const id = Number(pathname.split("/")[3]);

  // const [moduleSpecs, setModuleSpecs] = useState<ModuleSpec[]>([]);
  // const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>(
  //   []
  // );

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
            setModuleSpecs={setAllModuleSpecs}
          />
        </Wrapper>
        {/* <button onClick={() => setSelectedModuleSpecs(selectedModuleSpecNames)}>
          Import Specs
        </button>
        <button onClick={() => setSelectedModuleSpecs([])}>Delete</button> */}
      </FlexContainer>

      {selectedModuleSpecs ? (
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
