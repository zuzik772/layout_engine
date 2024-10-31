"use client";

import styled from "styled-components";
import data from "../data/module_groups_specs.json";
import Link from "next/link";
import { useState } from "react";
import { Table, TableWrapper } from "../components/table/styling";

export default function HomePage() {
  const moduleGroupsSpecs = data.module_group_specs;
  console.log(moduleGroupsSpecs);
  const [specs, setSpecs] = useState([]);
  return (
    <Wrapper>
      <FlexContainer>
        <h2>Module groups</h2>
        <button onClick={() => console.log(moduleGroupsSpecs)}>Import data</button>
        <button>Delete data</button>
      </FlexContainer>
      <TableWrapper>
        <Table>
          <tbody>
            {moduleGroupsSpecs.map((moduleGroupSpec) => (
              <tr key={moduleGroupSpec.id}>
                <td>
                  <LinkCss href={`/protected/modules/${moduleGroupSpec.id}`}>{moduleGroupSpec.name}</LinkCss>
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
