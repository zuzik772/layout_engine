"use client";

import styled from "styled-components";
import data from "../data/module_groups_specs.json";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const moduleGroupsSpecs = data.module_group_specs;
  const [specs, setSpecs] = useState([]);
  return (
    <Wrapper>
      <FlexContainer>
        <h2>Module groups</h2>
        <button onClick={() => console.log(moduleGroupsSpecs)}>
          Import data
        </button>
        <button>Delete data</button>
      </FlexContainer>
      <TableWrapper>
        <Table>
          <tbody>
            {moduleGroupsSpecs.map((moduleGroupSpec) => (
              <tr key={moduleGroupSpec.id}>
                <td>
                  <LinkCss href={`/cms/modules/${moduleGroupSpec.id}`}>
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

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  padding-left: 0;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(-140px + 100vh);
  overflow-y: auto;
`;

export const Table = styled.table`
  display: table;
  position: relative;
  width: 100%;
  th {
    text-align: left;
  }
  tbody {
    display: table-row-group;
    width: 100%;
  }
  tr {
    width: 100%;
    cursor: pointer;
  }
  tr:hover {
    background-color: #f5f5f5;
  }
`;

const LinkCss = styled(Link)`
  display: flex;
  width: 100%;
`;
