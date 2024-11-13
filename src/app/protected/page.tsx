"use client";

import styled from "styled-components";
import Link from "next/link";
import { Table, TableWrapper } from "../components/table/styling";
import { useModuleGroupProvider } from "../providers/ModuleGroupProvider";
import { useModuleGroupSpecs } from "../hooks/use-module-groups";
import { ModuleGroup } from "../data/typings";

export default async function HomePage() {
  // const { memoizedModuleGroups } = useModuleGroupProvider();
  // const moduleGroups = memoizedModuleGroups;

  const moduleGroups = await useModuleGroupSpecs();
  console.log(moduleGroups);
  if (!moduleGroups || !Array.isArray(moduleGroups)) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <FlexContainer>
        <h2>Module groups</h2>
        <button onClick={() => console.log(moduleGroups)}>Import data</button>
        <button>Delete data</button>
      </FlexContainer>
      <TableWrapper>
        <Table>
          <tbody>
            {moduleGroups.map((moduleGroupSpec: ModuleGroup) => (
              <tr key={moduleGroupSpec.id}>
                <td>
                  <LinkCss href={`/protected/modules/${moduleGroupSpec.id}`}>
                    {moduleGroupSpec.name}
                  </LinkCss>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  padding-left: 0;
`;

const LinkCss = styled(Link)`
  display: flex;
  width: 100%;
`;
