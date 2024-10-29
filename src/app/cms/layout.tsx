"use client";

import styled from "styled-components";
import SideNavigation from "../components/SideNavigation";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <WrapperCss>
      <SideNavigation />
      <MainCss>{children}</MainCss>
    </WrapperCss>
  );
}

const WrapperCss = styled.div`
  display: flex;
  gap: 1rem;
`;

const MainCss = styled.main`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.white};
`;
