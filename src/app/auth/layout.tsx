"use client";

import styled from "styled-components";
import { FlexContainer } from "../cms/page";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FlexCenterContainer>{children}</FlexCenterContainer>;
}

export const FlexCenterContainer = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
