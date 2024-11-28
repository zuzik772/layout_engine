"use client";

import styled from "styled-components";
import ModuleGroupsHeader from "../components/ModuleGroupsHeader";
import { ModuleGroupsTable } from "../components/table/ModuleGroupsTable";

export default function HomePage() {
  return (
    <Wrapper>
      <ModuleGroupsHeader />
      <TableWrapper>
        <ModuleGroupsTable />
      </TableWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(-140px + 100vh);
  overflow-y: auto;
`;
