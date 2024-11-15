"use client";

import styled from "styled-components";
import SideNavigation from "../components/SideNavigation";
import ModuleGroupProvider from "../providers/ModuleGroupProvider";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <WrapperCss>
      <SideNavigation />
      <ModuleGroupProvider>{children}</ModuleGroupProvider>
    </WrapperCss>
  );
}

const WrapperCss = styled.div`
  display: flex;
  gap: 1rem;
`;
