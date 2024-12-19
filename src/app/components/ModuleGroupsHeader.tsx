import React from "react";
import styled from "styled-components";

const ModuleGroupsHeader = () => {
  return (
    <FlexContainer>
      <h2>Module groups</h2>
    </FlexContainer>
  );
};

export default ModuleGroupsHeader;

const FlexContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  padding-left: 0;
  overflow: auto;
`;
