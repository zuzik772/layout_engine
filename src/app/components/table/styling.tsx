"use client";

import styled from "styled-components";

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
