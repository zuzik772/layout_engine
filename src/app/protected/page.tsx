"use client";

import styled from "styled-components";
import Link from "next/link";
import { Table, TableWrapper } from "../components/table/styling";
import { useModuleGroupProvider } from "../providers/ModuleGroupProvider";

export default function HomePage() {
  const { memoizedModuleGroups } = useModuleGroupProvider();
  const moduleGroups = memoizedModuleGroups;
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
            {moduleGroups.map((moduleGroupSpec) => (
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
