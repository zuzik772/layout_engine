"use client";

import styled from "styled-components";
import { FlexContainer } from "../components/ModuleGroups/ModuleGroups";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FlexCenterContainer>{children}</FlexCenterContainer>;
}

export const FlexCenterContainer = styled(FlexContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
`;
